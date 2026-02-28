import Image from "next/image"
import Link from "next/link"

interface ImageObject {
  filename?: string
  alt?: string
}

interface NewsItem {
  title: string
  excerpt?: string
  image?: ImageObject
  date?: string
  tag?: string
  slug?: string
}

interface NewsCardsProps {
  heading?: string
  eyebrow?: string
  items: NewsItem[]
  background?: "light" | "cream"
}

export default function NewsCards({
  heading,
  eyebrow,
  items,
  background = "cream",
}: NewsCardsProps) {
  return (
    <section className={background === "light" ? "section-light section-padding" : "section-cream section-padding"}>
      <div className="container-content">
        {(heading || eyebrow) && (
          <div className="text-center mb-12">
            {eyebrow && <p className="label-eyebrow mb-4">{eyebrow}</p>}
            {heading && <h2 className="heading-section">{heading}</h2>}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <article key={idx} className="card-rounded bg-white shadow-md group">
              {item.image?.filename && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image.filename}
                    alt={item.image.alt || item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {item.tag && (
                    <span className="absolute top-4 left-4 bg-moss-600 text-white text-[10px] font-body font-semibold uppercase tracking-wider px-3 py-1 rounded">
                      {item.tag}
                    </span>
                  )}
                </div>
              )}
              <div className="p-6">
                {item.date && (
                  <p className="text-xs text-stone-400 font-body mb-2">{item.date}</p>
                )}
                <h3 className="font-display font-light text-lg mb-2 group-hover:text-moss-600 transition-colors">
                  {item.slug ? (
                    <Link href={`/news/${item.slug}`} className="hover:text-moss-600">{item.title}</Link>
                  ) : (
                    item.title
                  )}
                </h3>
                {item.excerpt && (
                  <p className="text-sm text-stone-500 leading-relaxed">{item.excerpt}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
