/**
 * Configure-Price-Quote (CPQ) & Tier Discount Matrix Engine
 */

export interface QuoteLineItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  discountPercentage: number;
  tierVolumeDiscountPercentage: number;
  effectiveUnitPrice: number;
  lineTotal: number;
}

export interface CPQQuoteSummary {
  subtotal: number;
  totalDiscountAmount: number;
  effectiveDiscountPercentage: number;
  taxAmount: number;
  grandTotal: number;
  requiresExecutiveApproval: boolean;
  approvalReason?: string;
  lineItems: QuoteLineItem[];
}

export class CPQCalculator {
  public calculateQuote(
    items: { productId: string; name: string; quantity: number; unitPrice: number; requestedDiscountPct?: number }[],
    taxRate = 8.0
  ): CPQQuoteSummary {
    let subtotal = 0;
    let totalDiscount = 0;
    const computedLines: QuoteLineItem[] = [];

    for (const item of items) {
      const gross = item.quantity * item.unitPrice;
      subtotal += gross;

      // Volume tiered discount
      let volumeDiscount = 0;
      if (item.quantity >= 500) volumeDiscount = 20;
      else if (item.quantity >= 100) volumeDiscount = 15;
      else if (item.quantity >= 50) volumeDiscount = 10;
      else if (item.quantity >= 10) volumeDiscount = 5;

      const manualDiscount = item.requestedDiscountPct || 0;
      const combinedDiscount = Math.min(40, volumeDiscount + manualDiscount);

      const discountAmt = gross * (combinedDiscount / 100);
      totalDiscount += discountAmt;
      const lineTotal = gross - discountAmt;
      const effectiveUnit = lineTotal / item.quantity;

      computedLines.push({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discountPercentage: manualDiscount,
        tierVolumeDiscountPercentage: volumeDiscount,
        effectiveUnitPrice: Math.round(effectiveUnit * 100) / 100,
        lineTotal: Math.round(lineTotal * 100) / 100
      });
    }

    const netSubtotal = subtotal - totalDiscount;
    const taxAmount = (netSubtotal * taxRate) / 100;
    const grandTotal = netSubtotal + taxAmount;
    const effectivePct = subtotal > 0 ? (totalDiscount / subtotal) * 100 : 0;

    const requiresApproval = effectivePct > 20 || grandTotal > 250000;
    let approvalReason: string | undefined;
    if (requiresApproval) {
      approvalReason = effectivePct > 20 
        ? `Discount of ${effectivePct.toFixed(1)}% exceeds standard 20% threshold`
        : `Deal value of $${grandTotal.toLocaleString()} requires VP approval`;
    }

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      totalDiscountAmount: Math.round(totalDiscount * 100) / 100,
      effectiveDiscountPercentage: Math.round(effectivePct * 10) / 10,
      taxAmount: Math.round(taxAmount * 100) / 100,
      grandTotal: Math.round(grandTotal * 100) / 100,
      requiresExecutiveApproval: requiresApproval,
      approvalReason,
      lineItems: computedLines
    };
  }
}
