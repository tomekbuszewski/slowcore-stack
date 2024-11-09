import type { MetaFunction } from "@remix-run/node";

import { useState } from "react";
import { env } from "@env";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center">
      {visible && (
        <div
          className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 fixed top-5 right-5 animate-in slide-in-from-right"
          role="alert"
        >
          The env variable is: {env.VITE_PUBLIC_ENV || "you forgot to set it"}
        </div>
      )}

      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center justify-center">
          <label
            className="inline-flex items-center cursor-pointer"
            htmlFor="toggle-alert"
          >
            <input
              name="toggle-alert"
              id="toggle-alert"
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={(e) => {
                setVisible(e.target.checked);
              }}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Show alert
            </span>
          </label>
        </div>

        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
          <div className="h-[144px] w-[434px]">
            <img
              src="/logo-light.png"
              alt="Remix"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="Remix"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            What&apos;s next?
          </p>
          <ul>
            <li>
              <Link
                to="/jokes"
                className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
              >
                See a feature with server communication
              </Link>
            </li>
            <li>
              <hr />
            </li>
          </ul>
        </nav>
        <div className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
          Most styles took from{" "}
          <a
            href="https://flowbite.com/docs/components"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 dark:text-blue-400"
          >
            Flowbite
          </a>
          .
        </div>
      </div>
    </div>
  );
}
