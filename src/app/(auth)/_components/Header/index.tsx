import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Gutter } from "../Gutter";
import { HeaderNav } from "./Nav";
import classes from "./index.module.scss";

export const Header = () => {
  return (
    <header className={classes.header}>
      <Gutter className={classes.wrap}>
        <Link className={classes.heading} href="/">
          SS.me
          <span>•</span>
          <span className={classes.poweredBy}>Powered By</span>
          <div className={classes.logo}>
            <picture>
              <source
                media="(prefers-color-scheme: dark)"
                srcSet="https://raw.githubusercontent.com/payloadcms/payload/master/src/admin/assets/images/payload-logo-light.svg"
              />
              <Image
                alt="Payload Logo"
                height={30}
                src="https://raw.githubusercontent.com/payloadcms/payload/master/src/admin/assets/images/payload-logo-dark.svg"
                width={150}
              />
            </picture>
          </div>
        </Link>
        <HeaderNav />
      </Gutter>
    </header>
  );
};
