"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logout } from "@/lib/actions/auth";
import { useNoteContext } from "@/lib/noteContext";

const NoteSideBar = () => {
  const { user, categories, setSelectedCategory, selectedCategory } =
    useNoteContext();
  // console.log(categories);
  const { firstName, email, image } = user;

  return (
    <div className="flex h-full flex-col justify-between border-e bg-white">
      <div className="px-4 py-6">
        <span className="grid h-12 w-12 place-content-center rounded-full bg-red-400 text-xs  text-pink-400">
          <img src="/bear.png" alt="logo" className="w-12 h-12" />
        </span>

        <ul className="mt-6 space-y-1">
          <li>
            <a
              href="#"
              className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
            >
              Home
            </a>
          </li>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary
                onClick={() => setSelectedCategory("all")} // set selected category to all
                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="text-sm font-medium"> Category </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                {categories?.map((category) => (
                  <li
                    key={category._id}
                    onClick={() => setSelectedCategory(category._id)}
                  >
                    <a
                      href="#"
                      className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700
                        ${
                          selectedCategory === category._id
                            ? "bg-gray-100 text-gray-700"
                            : ""
                        }`}
                    >
                      {category.type}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </li>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> Account </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                {/* <li>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Details
                  </a>
                </li> */}

                <li>
                  <button
                    type="submit"
                    onClick={Logout}
                    className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      {/* user information */}
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a
          href="#"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
        >
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <p className="text-xs">
              <strong className="block font-medium">{firstName}</strong>

              <span> {email} </span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default NoteSideBar;
