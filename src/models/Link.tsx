import * as React from "react";

interface ILink {
  title: string;
  href: string;
}

class Link {
  title: string;
  href: string;

  constructor({ title, href }: ILink) {
    this.title = title;
    this.href = href;
  }

  toHTMLAnchor(
    key?: string | number | undefined
  ): React.ReactElement<HTMLAnchorElement> {
    return (
      <a href={this.href} target="_blank" key={key}>
        {`${this.title}/`}
      </a>
    );
  }
}

const Links = (() => {
  const links = {} as { [title: string]: Link };

  return {
    keys(): string[] {
      return Object.keys(links);
    },
    values(): Array<Link> {
      return Object.values(links);
    },
    add(link: Link | ILink) {
      if (!(link as Link).toHTMLAnchor) {
        link = new Link(link);
      }
      links[link.title] = link as Link;
    },
    addAll(newLinks: Array<Link | ILink>) {
      newLinks.forEach(link => this.add(link));
    },
    find(title: string): Link | null {
      return links[title];
    }
  };
})();

Links.addAll([
  {
    title: "github",
    href: "https://github.com/munky69rock"
  },
  {
    title: "twitter",
    href: "https://twitter.com/munky69rock"
  },
  {
    title: "facebook",
    href: "https://www.facebook.com/munky69rock"
  },
  {
    title: "qiita",
    href: "https://qiita.com/munky69rock"
  },
  {
    title: "wantedly",
    href: "https://www.wantedly.com/users/16629"
  }
]);

export { Link, Links };
