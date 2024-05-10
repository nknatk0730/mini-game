import { StageProvider } from "@/components/providers/Stage"

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <StageProvider>{children}</StageProvider>
  )
}
