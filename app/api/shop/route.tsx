import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await prisma.itemshop.findMany();
    return NextResponse.json(res);
  } catch (error) {
    console.error("Player DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete player" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const { product } = await req.json();
    const ids = product.map((g) => g.Id);

    const foundProducts = await prisma.itemshop.findMany({
      where: { id: { in: ids } },
      select: { id: true, name: true, price: true },
    });
    console.log(ids);
    console.log(product);

    let total = 0;
    const detailedItems = [];
    for (const cartItem of product) {
      const product = foundProducts.find((p) => p.id === cartItem.Id);
      if (!product) continue; // skip if not found

      const amount = product.price * cartItem.Quantity;
      total += amount;

      detailedItems.push({
        name: product.name,
        quantity: cartItem.Quantity,
        price: product.price,
        subtotal: amount,
      });
    }
    // intergrate mpesa
    // the amount paid minus the amount
    const amountPaid = total;
    const dates = new Date().toString();
    console.log(detailedItems, "total: ", total);
    const datas = await prisma.purchase.createMany({
      data: detailedItems.map((item) => ({
        // id: crypto.randomUUID(),
        productname: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
        total: total, // total for the whole cart
        amountPaid: amountPaid, // optional, if available
        purchaseDate: dates,
      })),
    });

    console.log("Saved purchases:", datas);

    return Response.json({
      items: detailedItems,
      totalAmount: total,
    });
  } catch (e) {
    throw new Error(e);
    // json(
    //   { error: "Failed to delete player" },
    //   { status: 500 }
    // );
  }
}
