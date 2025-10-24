
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faSearch, 
  faSeedling, 
  faFilm, 
  faHandHoldingHeart,
  faUsers,
  faGlobe,
  faAward
} from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              About <span className="text-red-600">LifeHurtMovieHeal</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A sanctuary where cinema becomes therapy, and every story has the power to heal wounded souls.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <FontAwesomeIcon icon={faHeart} className="text-red-600 mr-4 text-2xl" />
                Our Mission
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We believe in the transformative power of storytelling. In a world where life can be challenging, 
                movies and TV shows offer more than just entertainment—they provide comfort, understanding, 
                and the emotional healing we all need.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                LifeHurtMovieHeal is built on the principle that the right story at the right time can change 
                a person's perspective, heal emotional wounds, and provide the strength to keep moving forward.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <FontAwesomeIcon icon={faFilm} className="text-red-600 mr-4 text-2xl" />
                Our Story
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Founded by a team of film enthusiasts and mental health advocates, LifeHurtMovieHeal emerged 
                from a simple observation: people often turn to movies during difficult times, finding solace 
                in characters and stories that reflect their own experiences.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                We've created a platform that not only helps you discover great content but also guides you 
                toward films and shows that can provide the specific emotional support you need.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              What Makes Us Different
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gray-900 rounded-2xl hover:bg-gray-800 transition-colors">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faHandHoldingHeart} className="text-white text-2xl" />
                </div>
                <h3 className="text-white font-bold text-xl mb-4">Healing-First Approach</h3>
                <p className="text-gray-400">
                  Every recommendation is curated with emotional wellness in mind, helping you find content that truly resonates.
                </p>
              </div>
              
              <div className="text-center p-8 bg-gray-900 rounded-2xl hover:bg-gray-800 transition-colors">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faSearch} className="text-white text-2xl" />
                </div>
                <h3 className="text-white font-bold text-xl mb-4">Mood-Based Discovery</h3>
                <p className="text-gray-400">
                  Find exactly what you need based on your current emotional state and what you're seeking.
                </p>
              </div>
              
              <div className="text-center p-8 bg-gray-900 rounded-2xl hover:bg-gray-800 transition-colors">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faSeedling} className="text-white text-2xl" />
                </div>
                <h3 className="text-white font-bold text-xl mb-4">Growth-Oriented</h3>
                <p className="text-gray-400">
                  Our content helps you process emotions, gain new perspectives, and grow through challenging times.
                </p>
              </div>
            </div>
          </div>
        
        <div className="bg-gray-900 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Our Values</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <FontAwesomeIcon icon={faHeart} className="text-red-600 text-3xl mb-4" />
                <h4 className="text-white font-semibold mb-2">Empathy</h4>
                <p className="text-gray-400 text-sm">Understanding every emotional journey</p>
              </div>
              <div className="text-center">
                <FontAwesomeIcon icon={faUsers} className="text-red-600 text-3xl mb-4" />
                <h4 className="text-white font-semibold mb-2">Community</h4>
                <p className="text-gray-400 text-sm">Healing together through shared stories</p>
              </div>
              <div className="text-center">
                <FontAwesomeIcon icon={faGlobe} className="text-red-600 text-3xl mb-4" />
                <h4 className="text-white font-semibold mb-2">Diversity</h4>
                <p className="text-gray-400 text-sm">Stories from all cultures and perspectives</p>
              </div>
              <div className="text-center">
                <FontAwesomeIcon icon={faAward} className="text-red-600 text-3xl mb-4" />
                <h4 className="text-white font-semibold mb-2">Quality</h4>
                <p className="text-gray-400 text-sm">Curated content that truly makes a difference</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl text-white mb-4">Ready to Start Your Healing Journey?</h3>
            <p className="text-gray-400 mb-8">
              Explore our collection of healing films and discover stories that understand what you're going through.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Begin Healing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;