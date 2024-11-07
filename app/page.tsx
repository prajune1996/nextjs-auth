"use client";
import { useState } from "react";
import { TextInput, PasswordInput, Button, Text } from "@mantine/core";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Update the function to use the `data` property
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (error) {
      setMessage("Login failed. Please try again.");
    } else if (data.user) {
      router.push("/dashboard/home"); // Redirect to dashboard on success
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "8rem auto", padding: "2rem" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <TextInput
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          mt="md"
        />
        <Button type="submit" fullWidth mt="md">
          Login
        </Button>
      </form>
      {message && (
        <Text mt="md" color="red">
          {message}
        </Text>
      )}
    </div>
  );
}
