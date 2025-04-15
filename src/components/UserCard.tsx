"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface UserCardProps {
  name: string;
  email: string;
  image: string;
  role: string;
  id: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, image, role, id }) => {
  const [imageError, setImageError] = useState(false);

  const imageSrc = !imageError && image?.trim() !== "" ? image : "/default-avatar.png";

  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg rounded-2xl">
      <CardHeader className="flex md:flex-col justify-center items-center space-x-4">
        <div className="w-16 h-16 md:w-24 md:h-24  relative rounded-full overflow-hidden shrink-0 mx-auto">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        </div>
        <div className="text-center">
          <CardTitle className="text-lg">{name}</CardTitle>
          <p className="text-sm text-gray-500">{email}</p>
          <p className="text-sm text-gray-500">User Role: {role}</p>
          <p className="text-sm text-gray-500">#id: {id}</p>
        </div>
      </CardHeader>
      <CardContent>{/* Additional info or actions can go here */}</CardContent>
    </Card>
  );
};

export default UserCard;
