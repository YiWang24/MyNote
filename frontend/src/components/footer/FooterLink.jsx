import React from 'react'

const FooterLink = () => {
  return (
    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
    <li>
      <a
        className="text-gray-700 transition hover:text-gray-700/75"
        href="#"
      >
        {" "}
        About{" "}
      </a>
    </li>

    <li>
      <a
        className="text-gray-700 transition hover:text-gray-700/75"
        href="#"
      >
        {" "}
        Careers{" "}
      </a>
    </li>

    <li>
      <a
        className="text-gray-700 transition hover:text-gray-700/75"
        href="#"
      >
        {" "}
        History{" "}
      </a>
    </li>

    <li>
      <a
        className="text-gray-700 transition hover:text-gray-700/75"
        href="#"
      >
        {" "}
        Services{" "}
      </a>
    </li>

    <li>
      <a
        className="text-gray-700 transition hover:text-gray-700/75"
        href="#"
      >
        {" "}
        Projects{" "}
      </a>
    </li>

    <li>
      <a
        className="text-gray-700 transition hover:text-gray-700/75"
        href="#"
      >
        {" "}
        Blog{" "}
      </a>
    </li>
  </ul>
  )
}

export default FooterLink
