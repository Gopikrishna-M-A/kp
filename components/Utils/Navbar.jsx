"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button, Dropdown, Typography, Input, Select, Badge } from "antd";
import { useSession, signIn, signOut } from "next-auth/react"

const { Title, Text } = Typography;

const Navbar = () => {
  const { data: session } = useSession()
  const [user, setUser] = useState(session?.user)
  const [isNavExpanded, setIsNavExpanded] = useState(false);


  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const items = [
    {
      key: '1',
      label: (
        <Link href="/profile" rel="noopener noreferrer" >
          Profile
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link href="/orders" rel="noopener noreferrer" >
          Orders
        </Link>
      ),
    },
    {
      key: '3',
      danger: true,
      label: (
        <div onClick={signOut} rel="noopener noreferrer" >
         Sign out
        </div>
      ),
    },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-screen flex items-center justify-between p-5 border-b bg-white">
        <Link className="font-bold text-2xl" href="/">
          <Title level={3}>Realtime monitor</Title>
        </Link>

        

        <div className="flex items-center gap-4">
          <div className=" flex gap-8 mr-3">
          </div>
          {!user && (
              <Button onClick={signIn}>
                Sign in
              </Button>
          )}
          {user &&
          <Dropdown
            menu={{
              items,
            }}
          >
             <img src={user.image} className="cursor-pointer w-9 h-9 rounded-full"></img>
          </Dropdown>
            } 
        </div>
      </nav>
    </>
  );
};

export default Navbar;
