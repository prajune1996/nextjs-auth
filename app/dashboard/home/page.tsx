"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { Button } from "@mantine/core";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
      if (!user) {
        router.push("/"); // Redirect to login if not logged in
      } else {
        setUser(user);
      }
    };
    getUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error.message);
      } else {
        router.push("/");
        console.log("User logged out successfully");
        // Optionally, redirect to the login page or homepage
      }
    } catch (e) {
      console.error("Error logging out:", e);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      {user ? (
        <h1>Hello, {user.app_metadata.displayName || "User"}</h1>
      ) : (
        <p>Loading...</p>
      )}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
