import React from "react";
import {
  DefaultNodeTypes,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from "@payloadcms/richtext-lexical";
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from "@payloadcms/richtext-lexical/react";

import { cn } from "@/lib/utils";
import Image from "next/image";

type NodeTypes = DefaultNodeTypes;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw new Error("Expected value to be an object");
  }
  const slug = value.slug;
  return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),

  blocks: {
    ...defaultConverters.blocks,

    paragraph: (args: any) => (
      <p className="mb-4 leading-relaxed text-base">{args.nodesToJSX(args)}</p>
    ),

    text: (args: any) => <>{args.node.text}</>,

    linebreak: () => <br />,

    quote: (args: any) => (
      <blockquote className="border-l-4 pl-4 italic text-gray-600 dark:text-gray-400 my-6">
        {args.nodesToJSX(args)}
      </blockquote>
    ),

    table: (args: any) => (
      <div className="overflow-auto my-6">
        <table className="table-auto w-full border border-gray-200 dark:border-gray-700">
          {args.nodesToJSX(args)}
        </table>
      </div>
    ),

    tablerow: (args: any) => (
      <tr className="odd:bg-gray-50 even:bg-white dark:odd:bg-gray-800 dark:even:bg-gray-700">
        {args.nodesToJSX(args)}
      </tr>
    ),

    tablecell: (args: any) =>
      args.header ? (
        <th className="px-4 py-2 text-left font-medium">
          {args.nodesToJSX(args)}
        </th>
      ) : (
        <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
          {args.nodesToJSX(args)}
        </td>
      ),

    heading: (args: any) => {
      const Tag = `h${args.level}` as keyof React.JSX.IntrinsicElements;
      const sizes: Record<number, string> = {
        1: "text-4xl",
        2: "text-3xl",
        3: "text-2xl",
        4: "text-xl",
        5: "text-lg",
        6: "text-base",
      };
      return React.createElement(
        Tag,
        { className: `${sizes[args.level]} font-semibold mt-8 mb-4` },
        args.nodesToJSX(args),
      );
    },

    horizontalrule: () => (
      <hr className="my-8 border-gray-300 dark:border-gray-600" />
    ),

    list: (args: any) =>
      args.ordered ? (
        <ol className="list-decimal list-inside mb-4 space-y-2">
          {args.nodesToJSX(args)}
        </ol>
      ) : (
        <ul className="list-disc list-inside mb-4 space-y-2">
          {args.nodesToJSX(args)}
        </ul>
      ),

    listitem: (args: any) => <li className="ml-4">{args.nodesToJSX(args)}</li>,

    autolink: (args: any) => (
      <a
        href={args.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:text-primary-dark transition-colors"
      >
        {args.nodesToJSX(args)}
      </a>
    ),

    link: (args: any) => (
      <a href={args.url} className="text-primary underline">
        {args.nodesToJSX(args)}
      </a>
    ),

    upload: (args: any) => (
      <Image
        fill
        src={args.node.src}
        alt={args.node.alt || ""}
        className="w-full rounded-md my-4 object-cover"
      />
    ),

    tab: (args: any) => (
      <div className="tab-content mb-4">{args.nodesToJSX(args)}</div>
    ),
  },
});

type Props = {
  data: DefaultTypedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        "payload-richtext",
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          "mx-auto prose md:prose-md dark:prose-invert": enableProse,
        },
        className,
      )}
      {...rest}
    />
  );
}
