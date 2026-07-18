import Link from "next/link";
import { StatusPanel } from "@/components/layout/StatusPanel";
import { Button } from "@/components/ui/Button";
import { STRINGS } from "@/lib/constants";

export default function NotFound() {
  return (
    <StatusPanel
      window="error/404"
      code="404"
      command="meetheo --open <route>"
      title={STRINGS.notFoundTitle}
      message={STRINGS.notFoundMessage}
      tone="primary"
    >
      <Link href="/">
        <Button>{STRINGS.backHome}</Button>
      </Link>
    </StatusPanel>
  );
}
