import { NextRequest, NextResponse } from 'next/server';
import { doshaLifestylePlans } from '@/data/doshaLifestylePlans';

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  const doshaType = params.type;
  
  // Check if dosha type exists
  if (!doshaLifestylePlans[doshaType as keyof typeof doshaLifestylePlans]) {
    return NextResponse.json(
      { error: `Dosha type '${doshaType}' not found` },
      { status: 404 }
    );
  }
  
  // Get dosha data
  const doshaData = doshaLifestylePlans[doshaType as keyof typeof doshaLifestylePlans];
  
  return NextResponse.json({ doshaData });
}
