"use client";

import React from "react";
import {
  BlockComponentsMapperType,
  NotionBlock,
  Render as NotionRenderer,
} from "@9gustin/react-notion-render";
import { LinkAttributes } from "@9gustin/react-notion-render/dist/components/core/Render";

interface Props {
  blocks: NotionBlock[];
  useStyles?: boolean;
  classNames?: boolean;
  emptyBlocks?: boolean;
  slugifyFn?: (text: string) => string;
  mapPageUrlFn?: (input: unknown) => string;
  simpleTitles?: boolean;
  blockComponentsMapper?: BlockComponentsMapperType;
  linkAttributes?: (url: string) => LinkAttributes;
}

export function Renderer(props: Props) {
  return <NotionRenderer {...props} useStyles />;
}
