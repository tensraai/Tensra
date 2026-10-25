import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/approach")({
  beforeLoad: () => {
    throw redirect({ to: "/engagement", statusCode: 301 });
  },
});
