import React from "react";

export default function RequestRentalForm() {
  return (
    <>
      <div className="w-96 h-96 rounded-2xl justify-start items-start inline-flex">
        <div className="h-96 flex-col justify-center items-center inline-flex">
          <div className="self-stretch grow shrink basis-0 px-6 pt-6 bg-white rounded-2xl flex-col justify-start items-center inline-flex">
            <div className="w-56 h-44 pb-px justify-center items-center inline-flex">
              <img
                className="w-56 h-44 relative"
                src="https://via.placeholder.com/221x170"
              />
            </div>
            <div className="self-stretch h-56 p-7 flex-col justify-start items-center gap-3.5 flex">
              <div className="w-40 text-center text-neutral-500 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                Sturdy hammer that is made of wood!!!{" "}
              </div>
              <div className="px-6 justify-center items-center gap-1 inline-flex">
                <div className="text-center text-slate-800 text-base font-bold font-['Montserrat'] leading-normal tracking-tight">
                  Hammer -{" "}
                </div>
                <div className="text-center text-purple-800 text-sm font-bold font-['Montserrat'] leading-normal tracking-tight">
                  Tools
                </div>
              </div>
              <div className="h-20 relative">
                <div className="w-36 h-9 left-0 top-0 absolute">
                  <div className="w-24 h-4 left-[58px] top-[8.56px] absolute text-black text-xs font-normal font-['Poppins'] leading-normal">
                    Joseph Stalin
                  </div>
                  <img
                    className="w-10 h-9 left-0 top-0 absolute rounded-full"
                    src="https://via.placeholder.com/41x36"
                  />
                </div>
                <div className="w-32 h-6 left-[8.97px] top-[50.55px] absolute justify-start items-start gap-1 inline-flex">
                  <div className="w-6 h-6 p-0.5 justify-center items-center flex" />
                  <div className="w-6 h-6 px-0.5 py-0.5 justify-center items-center flex" />
                  <div className="w-6 h-6 px-0.5 py-0.5 justify-center items-center flex" />
                  <div className="w-6 h-6 px-0.5 py-0.5 justify-center items-center flex" />
                  <div className="w-6 h-6 px-0.5 py-0.5 justify-center items-center flex" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-96 px-12 py-10 bg-white flex-col justify-start items-center gap-10 inline-flex">
          <div className="text-center text-slate-800 text-2xl font-bold font-['Montserrat'] leading-loose tracking-tight">
            Request Item Rental
          </div>
          <div className="self-stretch h-44 bg-white rounded-sm flex-col justify-start items-start gap-2.5 flex">
            <div className="h-20 flex-col justify-center items-start gap-2.5 flex">
              <div className="text-slate-800 text-sm font-bold font-['Montserrat'] leading-normal tracking-tight">
                Return Date *
              </div>
              <div className="self-stretch h-12 justify-center items-center inline-flex">
                <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
                  <div className="grow shrink basis-0 self-stretch pl-4 pr-7 py-2.5 bg-stone-50 rounded border border-zinc-300 justify-start items-center gap-80 inline-flex">
                    <div className="text-neutral-500 text-sm font-normal font-['Montserrat'] leading-7 tracking-tight">
                      February 28, 2024
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-20 flex-col justify-center items-start gap-2.5 flex">
              <div className="text-slate-800 text-sm font-bold font-['Montserrat'] leading-normal tracking-tight">
                Custom Message
              </div>
              <div className="self-stretch h-12 justify-center items-center inline-flex">
                <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
                  <div className="grow shrink basis-0 self-stretch pl-4 pr-96 py-2.5 bg-stone-50 rounded border border-zinc-300 justify-start items-center inline-flex">
                    <div className="text-neutral-500 text-sm font-normal font-['Montserrat'] leading-7 tracking-tight">
                      Message
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-12 px-10 py-3.5 bg-purple-800 rounded flex-col justify-start items-center gap-2.5 flex">
            <div className="text-center text-white text-sm font-bold font-['Montserrat'] leading-snug tracking-tight">
              Rent Item
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
