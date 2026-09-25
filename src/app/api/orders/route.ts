import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

// GET all orders (admin only)
export async function GET() {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

interface CartLine {
  productId: string;
  quantity: number;
}

// POST create an order (public — guest checkout, no payment gateway).
// Prices are always recalculated from the database; client-submitted
// prices are never trusted.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      country,
      notes,
      items,
    } = body as {
      customerName?: string;
      customerEmail?: string;
      customerPhone?: string;
      shippingAddress?: string;
      country?: string;
      notes?: string;
      items?: CartLine[];
    };

    if (
      !customerName?.trim() ||
      !customerEmail?.trim() ||
      !shippingAddress?.trim()
    ) {
      return NextResponse.json(
        { message: "Name, email, and shipping address are required" },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(customerEmail.trim())) {
      return NextResponse.json(
        { message: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: "Cart is empty" },
        { status: 400 },
      );
    }

    const cleanedLines = items
      .filter(
        (line) =>
          line &&
          typeof line.productId === "string" &&
          Number.isFinite(line.quantity),
      )
      .map((line) => ({
        productId: line.productId,
        quantity: Math.min(Math.max(Math.floor(line.quantity), 1), 100),
      }));

    if (cleanedLines.length === 0) {
      return NextResponse.json(
        { message: "Cart is empty" },
        { status: 400 },
      );
    }

    const productIds = [...new Set(cleanedLines.map((l) => l.productId))];
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });
    const productMap = new Map(products.map((p) => [p.id, p]));

    const orderItemsData: {
      productId: string;
      name: string;
      price: number;
      quantity: number;
    }[] = [];
    let subtotal = 0;

    for (const line of cleanedLines) {
      const product = productMap.get(line.productId);
      if (!product) {
        return NextResponse.json(
          { message: `A product in your cart is no longer available` },
          { status: 409 },
        );
      }
      if (!product.inStock) {
        return NextResponse.json(
          { message: `"${product.name}" is currently out of stock` },
          { status: 409 },
        );
      }
      const price = Number(product.price);
      subtotal += price * line.quantity;
      orderItemsData.push({
        productId: product.id,
        name: product.name,
        price,
        quantity: line.quantity,
      });
    }

    const shippingCost = 0; // flat-rate/quote-based shipping, arranged manually
    const totalAmount = subtotal + shippingCost;

    const order = await prisma.order.create({
      data: {
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone?.trim() || null,
        shippingAddress: shippingAddress.trim(),
        country: country?.trim() || "Nepal",
        notes: notes?.trim() || null,
        subtotal,
        shippingCost,
        totalAmount,
        currency: "NPR",
        items: { create: orderItemsData },
      },
      include: { items: true },
    });

    // Best-effort owner notification — order is already saved regardless of
    // whether this email succeeds.
    try {
      if (process.env.OWNER_EMAIL && process.env.SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.OWNER_EMAIL,
            pass: process.env.SMTP_PASS,
          },
        });

        const itemsList = orderItemsData
          .map((i) => `- ${i.name} x${i.quantity} — Rs. ${i.price * i.quantity}`)
          .join("\n");

        await transporter.sendMail({
          from: process.env.OWNER_EMAIL,
          to: process.env.OWNER_EMAIL,
          subject: `[Om Wood Carving] New order ${order.orderNumber}`,
          text: `New order request from ${order.customerName} (${order.customerEmail})\n\nItems:\n${itemsList}\n\nTotal: Rs. ${totalAmount}\n\nShipping to:\n${order.shippingAddress}\n${order.country}\n\nPhone: ${order.customerPhone || "N/A"}\nNotes: ${order.notes || "N/A"}`,
        });
      }
    } catch (emailError) {
      console.error("Failed to send order notification email:", emailError);
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 },
    );
  }
}
