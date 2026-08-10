"use client";

import { useActionState } from "react";
import { signInWithEmail } from "../actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signInWithEmail, null);

  return (
    <form action={formAction}>
      {state?.error && <p className="cms-form-error" role="alert">{state.error}</p>}
      <div className="cms-field">
        <label className="cms-label" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="cms-input"
          placeholder="nama@email.com"
          defaultValue=""
        />
      </div>
      <div className="cms-field">
        <label className="cms-label" htmlFor="password">Kata Sandi</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="cms-input"
          placeholder="••••••••"
          defaultValue=""
        />
      </div>
      <button className="cms-button" type="submit" disabled={pending} aria-busy={pending}>
        {pending ? "Memeriksa…" : "Masuk"}
      </button>
    </form>
  );
}
