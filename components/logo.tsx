import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from 'next/image'
import LogoSvg from '@/assets/logo.svg';

export function Logo(props: { className?: string, link?: string }) {
  return (
    <Link href={props.link ?? '/'} className={cn("flex items-center space-x-2", props.className)}>
      <Image src={LogoSvg} alt="Lambda Devbox Logo" width={28} height={28} />
      <span className="font-bold sm:inline-block">Lambda Devbox</span>
    </Link>
  );
}
