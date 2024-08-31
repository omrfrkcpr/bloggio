<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<div align="center">

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

[contributors-shield]: https://img.shields.io/github/contributors/omrfrkcpr/bloggio.svg?style=flat-square&color=blue
[contributors-url]: https://github.com/omrfrkcpr/bloggio/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/omrfrkcpr/bloggio.svg?style=flat-square&color=blueviolet
[forks-url]: https://github.com/omrfrkcpr/bloggio/network/members
[stars-shield]: https://img.shields.io/github/stars/omrfrkcpr/bloggio.svg?style=flat-square&color=brightgreen
[stars-url]: https://github.com/omrfrkcpr/bloggio/stargazers
[issues-shield]: https://img.shields.io/github/issues/omrfrkcpr/bloggio.svg?style=flat-square&color=red
[issues-url]: https://github.com/omrfrkcpr/bloggio/issues
[license-shield]: https://img.shields.io/github/license/omrfrkcpr/bloggio.svg?style=flat-square&color=yellow
[license-url]: https://github.com/omrfrkcpr/bloggio/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&color=blue
[linkedin-url]: https://linkedin.com/in/omrfrkcpr

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/omrfrkcpr/bloggio">
    <img src="https://bloggio.s3.eu-north-1.amazonaws.com/bloggio-assets/symbol.png" alt="Logo" width="90" height="70">
  </a>

<h3 align="center">Bloggio</h3>

  <p align="center">
   A comprehensive blog platform. It allows users to authenticate, search for blogs by category and title, read detailed blog posts, create and share new blogs, edit existing ones, like and comment on others' blogs, and share them on other platforms. It offers a seamless and engaging experience for both bloggers and readers. Tools and frameworks: React and TypeScript for the frontend, Formik/Yup for form validation, and Redux / Toolkit for state management. Axios for API interactions.
    <br />
    <br />
    <a href="https://github.com/omrfrkcpr/bloggio"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/omrfrkcpr/bloggio-api"><strong>Bloggio-API »</strong></a>
    <br />
    <br />
    <a href="https://bloggio.de">View Demo</a>
    <a href="https://github.com/omrfrkcpr/bloggio/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    <a href="https://github.com/omrfrkcpr/bloggio/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#key-features">Key Features</a></li>
        <li><a href="#tech-stack">Tech Stack</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![bloggio](https://github.com/user-attachments/assets/779384e4-9181-45e0-b32e-5f7180413584)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,redux,ts,tailwind,materialui,npm,postman,vercel" />
  </a>
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- KEY FEATURES -->

## Key Features

- **User Authentication**
  - Easy account creation and login with Google.
- **Blog Creation and Management**
  - Create new blog posts with a title, image, description, tags, and category.
  - Save drafts and publish blogs at your convenience.
  - Edit existing blogs and manage them within customizable lists (e.g., Drafts, Published).
- **Advanced Search and Filtering**
  - Search for blogs by title, category, or tags.
  - Filter blogs based on categories for more targeted content discovery.
- **User Interaction**
  - Like, comment on, and save blogs from other users.
  - View trending blogs on the homepage.
- **Category-Based News Integration**
  - Fetch and display relevant world news from external APIs based on blog categories.
- **User Statistics and Analytics**
  - Track personal blog statistics with detailed graphs and tables.
  - Monitor engagement on your blogs, including likes, comments, and views.
- **Responsive Design**
  - Enjoy a seamless experience on any device with a user-friendly and intuitive interface.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TECH STACK -->

## Tech Stack

- **This section highlights the key technologies used in the Bloggio project and the reasoning behind choosing them.**

### Frontend

- **React**

  - React is a powerful JavaScript library for building user interfaces. Its component-based architecture enables the creation of reusable UI components, making the development process more efficient and scalable.

- **TypeScript**

  - TypeScript provides static type checking, which helps prevent errors during development. By catching potential issues before runtime, it enhances code reliability and maintainability.

- **Redux & Redux Toolkit**

  - Redux is a predictable state container for JavaScript apps, and Redux Toolkit simplifies the setup and management of global state. It reduces boilerplate code and helps manage complex state logic in a more organized manner.

- **Tailwind CSS**

  - Tailwind CSS is a utility-first CSS framework that allows for rapid UI development. It promotes a consistent design system and reduces the need for custom CSS, leading to a more maintainable codebase.

- **Material-UI**
  - Material-UI provides a set of pre-built, customizable components based on Google's Material Design guidelines. It accelerates the development process by offering ready-to-use components with a modern look and feel.

### Testing

- **Cypress**
  - Cypress is an end-to-end testing framework that is highly developer-friendly. It offers fast, reliable testing for web applications, making it easier to catch bugs early in the development process.

### Deployment & CI/CD

- **Vercel**
  - Vercel is a cloud platform for static sites and serverless functions. It provides a seamless deployment experience and ensures that the application is globally available with minimal downtime.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the GNU Public License. See [LICENSE.txt](https://github.com/omrfrkcpr/bloggio/blob/main/LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

[Send a Email](omerrfarukcapur@gmail.com)<br />
[Repo Link](https://github.com/omrfrkcpr/bloggio)<br />
[Demo Link](https://bloggio.de)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Bloggio-API](https://bloggio-api.onrender.com/)
- [Postman]()

<p align="right">(<a href="#readme-top">back to top</a>)</p>
