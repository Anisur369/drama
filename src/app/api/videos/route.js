import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_DATA_URL;
let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

async function getDatabase() {
  const client = await clientPromise;
  return client.db("drama_youtube_DB");
}

// GET: সব ভিডিও ফেচ করার জন্য
export async function GET() {
  try {
    const db = await getDatabase();
    const videos = await db.collection("videos").find({}).toArray();
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}

// POST: নতুন ভিডিও সেভ করার জন্য
export async function POST(request) {
  try {
    const body = await request.json();
    const db = await getDatabase();
    const result = await db.collection("videos").insertOne(body);
    return NextResponse.json({ success: true, result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
  }
}

// DELETE: ভিডিও ডিলিট করার জন্য
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    const db = await getDatabase();
    const result = await db.collection("videos").deleteOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
  }
}

// PUT: ভিডিও আপডেট বা এডিট করার জন্য
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    const db = await getDatabase();
    const result = await db.collection("videos").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
  }
}