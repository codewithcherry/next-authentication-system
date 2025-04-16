import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connect from "@/lib/database/db";
import User from "@/lib/models/user.model";

interface ApiResponse {
  type: string;
  message: string;
  user?: any;
}

export const GET = async (request: NextRequest) => {
  try {
    const userId = request.headers.get('userId');

    if (!userId) {
      return NextResponse.json(
        {
          type: 'error',
          message: 'UserId header is required'
        },
        {
          status: 400 // Bad Request
        }
      );
    }

    console.log("userId from request",userId);

    await connect();

    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        {
          type: 'error',
          message: 'User not found'
        },
        {
          status: 404
        }
      );
    }

    return NextResponse.json(
      {
        type: "success",
        message: 'User data fetched successfully',
        user
      },
      {
        status: 200
      }
    );
    
  } catch (error) {
    console.error('Error in user route:', error);
    return NextResponse.json(
      {
        type: "error",
        message: "Internal Server Error"
      },
      {
        status: 500
      }
    );
  }
}