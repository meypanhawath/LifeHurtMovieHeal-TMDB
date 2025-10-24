
import React from 'react';

const Support = () => {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Support & Help</h1>
          
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl text-white font-semibold mb-3">Need Immediate Support?</h3>
              <p className="text-gray-300 mb-4">
                If you're experiencing emotional distress or need someone to talk to, 
                please reach out to professional helplines.
              </p>
              <div className="space-y-2 text-blue-400">
                <div>National Suicide Prevention Lifeline: 1-800-273-8255</div>
                <div>Crisis Text Line: Text HOME to 741741</div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl text-white font-semibold mb-3">Platform Help</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Technical Issues</h4>
                  <p className="text-gray-300">Contact: support@lifehurtmovieheal.com</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Content Recommendations</h4>
                  <p className="text-gray-300">Need specific healing content? Let us help you find the right films.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;