import { useState } from "react";
import { Loader2, LogIn, Mail, Lock, CheckCircle2, Sparkles } from "lucide-react";
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
      <DialogContent className="sm:max-w-md overflow-hidden border-2 border-primary/40 bg-gradient-to-b from-card via-card to-secondary/80 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
        {/* Pokébola decorativa no topo */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-b from-red-500 via-red-500 to-slate-900 opacity-20 blur-sm" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-gradient-to-b from-yellow-400 via-yellow-400 to-slate-900 opacity-10 blur-md" />

        <DialogHeader className="relative">
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/50 bg-gradient-to-b from-red-500 to-red-600 shadow-lg shadow-red-500/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-900 bg-gradient-to-b from-slate-100 to-slate-300">
              <div className="h-3 w-3 rounded-full border-2 border-slate-900 bg-white shadow-inner" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-black tracking-tight text-foreground">
            {user ? (
              <span className="text-gradient">Bem-vindo de volta!</span>
            ) : (
              <>
                <span className="text-gradient">Entrar</span>{" "}
                <span className="text-primary">na sua conta</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-center">
            {user
              ? `Você está logado como ${user.email}`
              : "Acesse sua conta para finalizar suas compras mais rápido."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="relative flex flex-col items-center justify-center py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <p className="mt-4 text-sm font-bold text-foreground">Login realizado com sucesso!</p>
            <p className="mt-1 text-xs text-muted-foreground">Você é um Mestre Pokémon!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative space-y-5">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Mail className="h-3.5 w-3.5 text-primary" />
                E-mail
              </Label>
              <div className="relative">
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="h-11 border-2 border-primary/30 bg-background/60 pl-10 text-foreground shadow-inner transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                  autoComplete="email"
                  required
                />
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Lock className="h-3.5 w-3.5 text-primary" />
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="h-11 border-2 border-primary/30 bg-background/60 pl-10 text-foreground shadow-inner transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                  autoComplete="current-password"
                  required
                />
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2.5" role="alert">
                <Sparkles className="h-4 w-4 shrink-0 text-destructive" />
                <p className="text-sm font-medium text-destructive">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="h-12 w-full bg-gradient-to-r from-primary via-primary to-primary/80 text-base font-bold shadow-lg shadow-primary/30 transition-all hover:from-primary/90 hover:via-primary/90 hover:to-primary/70 hover:shadow-primary/40"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Capturando...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Entrar
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              <Sparkles className="mr-1 inline h-3 w-3 text-yellow-400" />
              Treinador, sua aventura começa aqui!
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
