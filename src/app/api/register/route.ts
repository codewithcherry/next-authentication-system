import { NextResponse, NextRequest } from "next/server";
import connect from "@/lib/database/db";
import User from "@/lib/models/user.model";
import bcrypt from "bcryptjs";

interface RequestBody {
  email: string;
  password: string;
}

export const POST = async (request: NextRequest) => {
  try {
    await connect();

    // Type assertion can be used here if you want to be explicit
    const { email, password } = (await request.json()) as RequestBody;

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { type: "error", message: "Both email and password are required" },
        { status: 400 }
      );
    }

    // Rest of your implementation...
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { type: "error", message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "user",
      name: email.split("@")[0]
    });

    await newUser.save();

    return NextResponse.json(
      { 
        type: "success", 
        message: "User created",
        data: {
          id: newUser._id.toString(),
          email: newUser.email,
          name: newUser.name,
          role: newUser.role
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json(
      { type: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
};