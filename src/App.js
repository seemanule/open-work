import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const accordions = document.querySelectorAll('.faq-card-header button');
    
    accordions.forEach((accordion) => {
      accordion.addEventListener('click', () => {
        const target = document.querySelector(accordion.getAttribute('data-target'));
        
        if (target.classList.contains('show')) {
          accordion.classList.remove('open');
        } else {
          accordion.classList.add('open');
        }

        // Toggle other buttons
        accordions.forEach((btn) => {
          if (btn !== accordion) {
            const otherTarget = document.querySelector(btn.getAttribute('data-target'));
            if (!otherTarget.classList.contains('show')) {
              btn.classList.remove('open');
            }
          }
        });
      });
    });
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  useEffect(() => {
  

    const handlePageLoad = () => {
      setIsLoading(false);
    };
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', handlePageLoad);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('load', handlePageLoad);
      window.removeEventListener('resize', handleResize);
     
    };
    
  }, []);
 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/YOUR_EMAIL@example.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: 'Openwork Landing page form Entry',
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setResponseMessage('Thank you for your message. It has been submitted.');
      setFormData({ name: '', email: '', message: '' });
      e.target.reset(); // Clear the form
    } catch (error) {
      setResponseMessage(`Failed to send the message: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageClick = (e) => {
    if (isMobile) {
      e.preventDefault();
    }
  };

  return (
    <div className="App">
       {isLoading && (
        <div className="loader-container">
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Loading..." className="loader-logo" />
        </div>
      )}
      {!isLoading && (
        <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand mx-auto d-flex align-items-center" href="#">
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" className="logo" />   
          </a>
        
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="button1 mr-20" href="#contact">
                <span className="buttontext1">Contact Us</span></a>
              </li>
              <li className="nav-item">
              <a class="button2"  href="https://app.openwork.technology/" target='_blank' rel="noreferrer" >
        <span className="buttontext2">Open App </span><span className="arrow">↗</span>
    </a>
              </li>
          
            </ul>
          </div>
        </div>
      </nav>
      <section className="hero-section text-center">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 ">
              <h1 className="hero-title">The future of work is decentralised and transparent</h1>
              <p className="hero-subtitle">
                OpenWork enables two strangers to safely enter work contracts, pay in crypto, use escrow services, resolve disputes, build reputations, and maintain self-custody of their profiles, all without the need for a centralized authority of any kind.
              </p>
              <div className="buttoncenter">
              <a class="button"  href="https://drive.google.com/file/d/1tdpuAM3UqiiP_TKJMa5bFtxOG4bU_6ts/view" target='_blank' rel="noreferrer" >
        <span className="buttontext">Read Whitepaper </span><span className="arrow">↗</span>
    </a></div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="hero-image">
                <img src={`${process.env.PUBLIC_URL}/images/hero.png`} alt="Hero" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="platform-section text-center">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <div className="platform-top">
              <img src={`${process.env.PUBLIC_URL}/images/icon1.png`} alt="Platform Icon" className="platform-icon" />
              <h4 className="platform-title">About OpenWork</h4>
              </div>
              <p className="platform-subtitle">Free from central authority, OpenWork introduces a new paradigm of work engagement and management.</p>
              <a className="button" href="https://drive.google.com/file/d/1tdpuAM3UqiiP_TKJMa5bFtxOG4bU_6ts/view" target='_blank' rel="noreferrer" >
              <span className="buttontext">Read Whitepaper</span> <span className="arrow">↗</span>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 ">
              <div className="card bg-image" style={{ backgroundImage: `url(${`${process.env.PUBLIC_URL}/images/image1.png`})` }}>
                <div className="card-body">
                  <h5 className="card-title">Program your work contracts</h5>
                  <p className="card-text">Enter and execute jobs through smart contracts- store briefs, proposals, crypto escrow payments, release payments, submit work, view details of job giver and taker.</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 ">
              <div className="card bg-image" style={{ backgroundImage: `url(${`${process.env.PUBLIC_URL}/images/image2.png`})` }}>
                <div className="card-body">
                  <h5 className="card-title">Athena - Skill Oracles for decentralised dispute resolution</h5>
                  <p className="card-text">Nodes on the OpenWork network qualified to assess jobs of a certain skill can stake their tokens to resolve disputes & verify skills.</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 ">
              <div className="card bg-image" style={{ backgroundImage: `url(${`${process.env.PUBLIC_URL}/images/image3.png`})` }}>
                <div className="card-body">
                  <h5 className="card-title">Decentralised Governance</h5>
                  <p className="card-text">The OpenWork DAO ensures governance of all of the following is decentralised: smart contract updates and upgrades, Athena and everything else.</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 ">
              <div className="card bg-image" style={{ backgroundImage: `url(${`${process.env.PUBLIC_URL}/images/image4.png`})` }}>
                <div className="card-body">
                  <h5 className="card-title">Open access to all work data</h5>
                  <p className="card-text">All data related to OpenWork is made public on the OpenWork ledger, permanently & immutably stored on IPFS with a record on the blockchain. Anyone on the internet will have equal access to all job data, including payment, promises, disputes & delivery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="how-it-works-section text-center">
        <div className="container">
          <h2 className="how-it-works-title">How it works</h2>
          <p className="how-it-works-subtitle">OpenWork is a decentralized work protocol redefining the way people collaborate on the internet.</p>
          <a className="button" href="https://drive.google.com/file/d/1tdpuAM3UqiiP_TKJMa5bFtxOG4bU_6ts/view" target='_blank' rel="noreferrer" >
              <span className="buttontext">Read Whitepaper</span> <span className="arrow">↗</span>
              </a>
          </div></section>
      <section className="how-it-works-section">
        <div className="container how-it-works-container">
          <div className="row">
            <div className="col-12">
              <picture className='onlydesktop'>
               
              <a 
                  href={`${process.env.PUBLIC_URL}/images/how-it-works-desktop.jpg`} 
                  data-lightbox="how-it-works" 
                  data-title="How it works"
                >
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/how-it-works-desktop.jpg`} 
                    alt="How it works" 
                    className="img-fluid fullwidth"
                  />
                </a>
              </picture>
              <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap', height: 'auto', width: '1000px' }} className='onlymobile'>
                    <img 
                      src={`${process.env.PUBLIC_URL}/images/how-it-works-desktop.jpg`} 
                      alt="How it works" 
                      className="img-fluid fullwidth"
                      style={{ display: 'inline-block', height: '100%' }}
                    />
                    <p>Swipe the image to right</p>
                </div>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-section" id="faq-section">
        <div className="container">
          <h2 className="faq-title text-center">FAQs</h2>
          <div className="accordion" id="faqAccordion">
            <div className="faq-card">
              <div className="faq-card-header" id="headingOne">
                <h5 className="mb-0">
                  <button className="btn btn-link open" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  What is OpenWork?
                    <img src={`${process.env.PUBLIC_URL}/images/down-arrow.svg`} alt="Down Arrow" className="toggle-icon down-arrow" />
                    <img src={`${process.env.PUBLIC_URL}/images/up-arrow.svg`} alt="Up Arrow" className="toggle-icon up-arrow" />
                  </button>
                </h5>
              </div>

              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#faqAccordion">
                <div className="faq-card-body">
                OpenWork is a decentralized platform that facilitates transparent and autonomous work agreements through blockchain technology and smart contracts.

                </div>
              </div>
            </div>
            <div className="faq-card">
              <div className="faq-card-header" id="headingTwo">
                <h5 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  How do I create an account on OpenWork?
                    <img src={`${process.env.PUBLIC_URL}/images/down-arrow.svg`} alt="Down Arrow" className="toggle-icon down-arrow" />
                    <img src={`${process.env.PUBLIC_URL}/images/up-arrow.svg`} alt="Up Arrow" className="toggle-icon up-arrow" />
                  </button>
                </h5>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#faqAccordion">
                <div className="faq-card-body">
                You can create an account on OpenWork by connecting your non-custodial wallet, such as MetaMask, and signing the necessary authorization.
                </div>
              </div>
            </div>
            <div className="faq-card">
              <div className="faq-card-header" id="headingThree">
                <h5 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  What are the main features of OpenWork?
                    <img src={`${process.env.PUBLIC_URL}/images/down-arrow.svg`} alt="Down Arrow" className="toggle-icon down-arrow" />
                    <img src={`${process.env.PUBLIC_URL}/images/up-arrow.svg`} alt="Up Arrow" className="toggle-icon up-arrow" />
                  </button>
                </h5>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#faqAccordion">
                <div className="faq-card-body">
                Key features include job posting and application, smart contract-based job agreements, user profile management, dispute resolution through skill oracles, and a decentralized autonomous organization (DAO) for governance.
                </div>
              </div>
            </div>
            <div className="faq-card">
              <div className="faq-card-header" id="headingFour">
                <h5 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  How does the smart contract work in OpenWork?
                    <img src={`${process.env.PUBLIC_URL}/images/down-arrow.svg`} alt="Down Arrow" className="toggle-icon down-arrow" />
                    <img src={`${process.env.PUBLIC_URL}/images/up-arrow.svg`} alt="Up Arrow" className="toggle-icon up-arrow" />
                  </button>
                </h5>
              </div>
              <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#faqAccordion">
                <div className="faq-card-body">
                Smart contracts automatically execute work agreements based on predefined conditions, ensuring payment is made when the agreed-upon tasks are completed.
                </div>
              </div>
            </div>
            <div className="faq-card">
              <div className="faq-card-header" id="headingFive">
                <h5 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                  What is a Skill Oracle?
                    <img src={`${process.env.PUBLIC_URL}/images/down-arrow.svg`} alt="Down Arrow" className="toggle-icon down-arrow" />
                    <img src={`${process.env.PUBLIC_URL}/images/up-arrow.svg`} alt="Up Arrow" className="toggle-icon up-arrow" />
                  </button>
                </h5>
              </div>
              <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#faqAccordion">
                <div className="faq-card-body">
               A Skill Oracle is a group of verified users with specific skills who can assess work quality and resolve disputes within the OpenWork platform.
                </div>
              </div>
            </div>
            <div className="faq-card">
              <div className="faq-card-header" id="headingSix">
                <h5 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                  How does dispute resolution work in OpenWork?
                    <img src={`${process.env.PUBLIC_URL}/images/down-arrow.svg`} alt="Down Arrow" className="toggle-icon down-arrow" />
                    <img src={`${process.env.PUBLIC_URL}/images/up-arrow.svg`} alt="Up Arrow" className="toggle-icon up-arrow" />
                  </button>
                </h5>
              </div>
              <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#faqAccordion">
                <div className="faq-card-body">
                Disputes are resolved by the Skill Oracle, where members vote on the outcome. The decision is executed through smart contracts, ensuring fairness and transparency.
                </div>
              </div>
            </div>
            <div className="faq-card">
              <div className="faq-card-header" id="headingSeven">
                <h5 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                  How can I earn referral royalties?
                    <img src={`${process.env.PUBLIC_URL}/images/down-arrow.svg`} alt="Down Arrow" className="toggle-icon down-arrow" />
                    <img src={`${process.env.PUBLIC_URL}/images/up-arrow.svg`} alt="Up Arrow" className="toggle-icon up-arrow" />
                  </button>
                </h5>
              </div>
              <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven" data-parent="#faqAccordion">
                <div className="faq-card-body">
                By referring new users to OpenWork, you can earn a 1% royalty on every job they give or take for their lifetime on the platform.
                </div>
              </div>
            </div>
            <div className="faq-card">
              <div className="faq-card-header" id="headingEight">
                <h5 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                  What is the OpenWork DAO?
                    <img src={`${process.env.PUBLIC_URL}/images/down-arrow.svg`} alt="Down Arrow" className="toggle-icon down-arrow" />
                    <img src={`${process.env.PUBLIC_URL}/images/up-arrow.svg`} alt="Up Arrow" className="toggle-icon up-arrow" />
                  </button>
                </h5>
              </div>
              <div id="collapseEight" className="collapse" aria-labelledby="headingEight" data-parent="#faqAccordion">
                <div className="faq-card-body">
                The OpenWork DAO is a decentralized autonomous organization that governs the platform, making decisions on upgrades, treasury management, and other critical aspects through a voting system.
                </div>
              </div>
            </div>
            <div className="faq-card">
              <div className="faq-card-header" id="headingNine">
                <h5 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                  How can I view details of each job?
                    <img src={`${process.env.PUBLIC_URL}/images/down-arrow.svg`} alt="Down Arrow" className="toggle-icon down-arrow" />
                    <img src={`${process.env.PUBLIC_URL}/images/up-arrow.svg`} alt="Up Arrow" className="toggle-icon up-arrow" />
                  </button>
                </h5>
              </div>
              <div id="collapseNine" className="collapse" aria-labelledby="headingNine" data-parent="#faqAccordion">
                <div className="faq-card-body">
                You can view details of each job, including job giver and taker information, requirements, work submissions, and payment details, through the OpenWork Ledger (OWL) which displays all jobs in real-time.
                </div>
              </div>
            </div>
            <div className="faq-card">
              <div className="faq-card-header" id="headingTen">
                <h5 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                  How does OpenWork ensure the security and integrity of transactions?
                    <img src={`${process.env.PUBLIC_URL}/images/down-arrow.svg`} alt="Down Arrow" className="toggle-icon down-arrow" />
                    <img src={`${process.env.PUBLIC_URL}/images/up-arrow.svg`} alt="Up Arrow" className="toggle-icon up-arrow" />
                  </button>
                </h5>
              </div>
              <div id="collapseTen" className="collapse" aria-labelledby="headingTen" data-parent="#faqAccordion">
                <div className="faq-card-body">
                OpenWork uses blockchain technology and smart contracts to secure transactions. All data is stored on a decentralized, immutable ledger, ensuring transparency and preventing tampering.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-section pt-5" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="contact-info">
             
                <div className="platform-top">
                <img src={`${process.env.PUBLIC_URL}/images/contact-icon.png`} alt="Contact Icon" className="contact-icon" />
              <h4 className="contact-title">Get in touch</h4>
              </div>
              
                <h3 className="contact-subtitle">Contact Us</h3>
                <p className="contact-description">Kindly fill out this form and we’ll reach out to you!</p>
              </div>
            </div>
            <div className="col-12 col-md-6">
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input type="text" className="form-control" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <textarea className="form-control" name="message" rows="5" placeholder="Type a message here..." value={formData.message} onChange={handleChange} required></textarea>
                </div>
                
                <button type="submit" className="contactbutton">
                  {isSubmitting ? 'Submitting Form...' : 'Submit'}
                </button>
              </form>
              {responseMessage && <p className="response-message">{responseMessage}</p>}
            </div>
          </div>
        </div>
      </section>
   
      <footer className="footer">
        <div className="container text-center">
          <p>©2024 All Copyrights Reserved by OpenWork</p>
        </div>
      </footer>
    </>
      )}
    </div>
  );
}

export default App;
