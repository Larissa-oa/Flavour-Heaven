import React from "react";
import "./AboutPage.css";
import ourTeamImg from "../images/our-team.png";
import linkedinIcon from "../images/linkedin-icon.png";
import githubIcon from "../images/github-icon.png";

function AboutPage() {
  return (
    <div className="about-container">
      <div className="about-image-container">
        <img src={ourTeamImg} alt="Our team" className="about-header-image" />
      </div>

      <div className="about-content">
        <h1 className="about-title">About Us</h1>

        <p className="about-intro">
          Welcome to <strong>[Your App Name]</strong>, the ultimate recipe app
          created by three food-loving professionals who know their way around a
          kitchen, a business, and a dinner table.
        </p>

        <h2 className="team-section-title">Meet the Team</h2>

        <div className="team-member">
          <h3>
            <strong>
              <span className="larissa">Larissa</span> – The Chef Extraordinaire
            </strong>{" "}
            👩‍🍳🔥
          </h3>
          <p>
            With years of experience as a professional chef, Larissa is the
            mastermind behind the delicious recipes you’ll find in our app.
            She’s perfected the art of turning simple ingredients into
            mouthwatering meals. Whether it's a gourmet feast or a 5-minute
            snack, if Larissa says it's good, trust us—it’s really good.
          </p>
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/larissa-almeida-2a8370253/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button linkedin"
            >
              <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/Larissa-oa"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button github"
            >
              <img src={githubIcon} alt="GitHub" className="social-icon" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="team-member">
          <h3>
            <strong>
              <span className="rojda">Rojda</span> – The Business Brain
            </strong>{" "}
            📊💡
          </h3>
          <p>
            With a strong background in business management, Rojda keeps
            everything running smoothly behind the scenes. She makes sure our
            app is as efficient as your dream kitchen—minus the dirty dishes.
            Whether it’s organization, strategy, or making sure we don’t spend
            our entire budget on snacks, Rojda is the one keeping us on track.
          </p>
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/rojdapolat/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button linkedin"
            >
              <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/itsroj"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button github"
            >
              <img src={githubIcon} alt="GitHub" className="social-icon" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="team-member">
          <h3>
            <strong>
              <span className="vassilis">Vassilis</span> – The Sales Pro & Chief
              Taste Tester
            </strong>{" "}
            💼🍽️
          </h3>
          <p>
            With a strong background in sales—convincing people to buy things
            they didn’t even know they needed—and an even stronger background in
            eating, Vassilis ensures that our app is not just useful but also
            fun and easy to use. He believes that good food should be simple,
            delicious, and available at the tap of a button—preferably before he
            gets hungry.
          </p>
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/vassilis-bousbourelis/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button linkedin"
            >
              <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/vasbous"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button github"
            >
              <img src={githubIcon} alt="GitHub" className="social-icon" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <h2 className="mission-title">Our Mission</h2>
        <p className="mission-text">
          We created <strong>[Your App Name]</strong> to make cooking{" "}
          <strong>fun</strong>, <strong>easy</strong>, and{" "}
          <strong>stress-free</strong>. Whether you're a pro in the kitchen or
          someone who still burns toast (no judgment!), our app is here to help.
          With step-by-step guides, useful tips, and recipes for every occasion,
          we're on a mission to bring great food to every home—without the
          chaos.
        </p>
        <p className="mission-text">
          So grab your apron (or don't, we won't judge), start exploring, and
          let's get cooking!
        </p>
        <p className="closing">
          <strong>Bon appétit!</strong> 🥳👨‍🍳🥘
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
