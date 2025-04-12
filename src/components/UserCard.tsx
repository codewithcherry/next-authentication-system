"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserCardProps {
  name: string;
  email: string;
  imageUrl: string;
  role: string;
  id: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, imageUrl, role, id }) => {
  console.log(imageUrl);
  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg rounded-2xl">
      <CardHeader className="flex items-center space-x-4">
        <Avatar className="h-14 w-14">
          {imageUrl ? (
            <AvatarImage src={imageUrl} alt={name} className=" object-cover" />
          ) : null}
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <p className="text-sm text-gray-500">{email}</p>
          <p className="text-sm text-gray-500">User Role:{role}</p>
          <p className="text-sm text-gray-500">#id:{id}</p>
        </div>
      </CardHeader>
      <CardContent>{/* Additional info or actions can go here */}</CardContent>
    </Card>
  );
};

export default UserCard;
