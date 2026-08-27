import { ArrowUpRight, Sparkles } from "lucide-react";

export default function ShopNewsletter() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-[100px]">

        <div className="relative overflow-hidden rounded-3xl bg-neutral-950 text-white">

          {/* Decorative circle */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10" />

          <div className="relative grid min-h-[380px] md:grid-cols-[1.3fr_0.7fr]">

            {/* =================================================
                CONTENT
            ================================================== */}
            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">

              {/* Label */}
              <div className="flex items-center gap-2.5">

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15">
                  <Sparkles
                    size={14}
                    strokeWidth={1.6}
                  />
                </span>

                <span className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                  Digital Shop
                </span>

              </div>


              {/* Heading */}
              <h2 className="mt-7 max-w-xl text-4xl font-semibold leading-[1.1] tracking-[-0.04em] md:text-5xl">
                Things I make
                <span className="text-white/55">
                  {" "}beyond the screen.
                </span>
              </h2>


              {/* Description */}
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/70 md:text-base">
                Templates, planners, and digital resources designed to help
                you organize, create, and get things done.
              </p>


              {/* Button */}
              <a
                href="https://your-shop-link.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 flex w-fit items-center gap-3 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.02]"
              >
                Visit my shop

                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>

            </div>


            {/* =================================================
                PRODUCT VISUAL
            ================================================== */}
            <div className="relative hidden min-h-[380px] overflow-hidden md:block">

              {/* Decorative plus */}
              <span className="pointer-events-none absolute right-8 top-4 text-[160px] font-bold leading-none text-white/[0.035]">
                +
              </span>


              {/* Product */}
              <div className="absolute left-1/2 top-1/2 w-[270px] -translate-x-1/2 -translate-y-1/2 rotate-[-5deg]">

                {/* Back card */}
                <div className="absolute -right-3 -top-3 h-full w-full rotate-[8deg] rounded-xl border border-white/10 bg-white/[0.03]" />

                {/* Main card */}
                <div className="relative rounded-xl bg-white p-5 text-black shadow-xl">

                  <div className="flex items-center justify-between">

                    <span className="text-[8px] uppercase tracking-[0.2em] text-black/40">
                      Digital Collection
                    </span>

                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.7}
                    />

                  </div>


                  <p className="mt-10 text-[9px] uppercase tracking-[0.15em] text-black/35">
                    Plan · Organize · Create
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.04em]">
                    Make space
                    <br />
                    for what matters.
                  </h3>


                  {/* Preview */}
                  <div className="mt-7 grid grid-cols-3 gap-1.5">

                    <div className="h-12 rounded-md bg-black/5" />
                    <div className="h-12 rounded-md bg-black/10" />
                    <div className="h-12 rounded-md bg-black/5" />

                  </div>


                  <div className="mt-6 flex items-center justify-between">

                    <span className="text-[8px] uppercase tracking-[0.12em] text-black/30">
                      Digital products
                    </span>

                    <span className="text-[8px] text-black/30">
                      01
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}