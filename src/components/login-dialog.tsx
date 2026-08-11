import { useState } from "react";
import { Loader2, LogIn, Mail, Lock, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function LoginDialog({ open, onOpenChange, onSuccess }: LoginDialogProps) {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Preencha todos os campos para continuar.");
      return;
    }

    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);

    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setEmail("");
        setPassword("");
        onOpenChange(false);
        onSuccess?.();
      }, 800);
    } else {
      setError("E-mail ou senha inválidos. A senha deve ter pelo menos 6 caracteres.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {user ? "Bem-vindo de volta!" : "Entrar na sua conta"}
          </DialogTitle>
          <DialogDescription>
            {user
              ? `Você está logado como ${user.email}`
              : "Acesse sua conta para finalizar suas compras mais rápido."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="h-12 w-12 text-primary" />
            <p className="mt-3 text-sm font-medium text-foreground">Login realizado com sucesso!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="pl-9"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="pl-9"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Entrar
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
