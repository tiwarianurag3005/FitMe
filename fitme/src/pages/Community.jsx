import { useState, useRef } from 'react';
import { Heart, MessageCircle, Share2, Award, Users, TrendingUp } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('feed');
  
  // Mock community data
  const posts = [
    {
      id: 1,
      user: {
        name: 'Alex Johnson',
        avatar: 'AJ',
        role: 'Fitness Coach'
      },
      content: 'Just completed a 10K run in under 45 minutes! New personal best! 🏃‍♂️💨',
      image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 5,
      liked: false
    },
    {
      id: 2,
      user: {
        name: 'Sarah Miller',
        avatar: 'SM',
        role: 'Yoga Instructor'
      },
      content: 'Morning yoga session overlooking the ocean. Starting the day with gratitude and mindfulness. Remember to take time for yourself today! 🧘‍♀️🌊',
      image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      timestamp: '5 hours ago',
      likes: 42,
      comments: 8,
      liked: true
    },
    {
      id: 3,
      user: {
        name: 'Mike Peterson',
        avatar: 'MP',
        role: 'Weight Training'
      },
      content: 'Hit a new PR on deadlifts today - 315 lbs! Hard work and consistency paying off after months of training. What are your fitness goals for this month? 💪',
      timestamp: '1 day ago',
      likes: 18,
      comments: 12,
      liked: false
    }
  ];
  
  const challenges = [
    {
      id: 1,
      title: '30-Day Plank Challenge',
      participants: 1452,
      difficulty: 'Beginner',
      duration: '30 days',
      image: 'https://images.pexels.com/photos/8401843/pexels-photo-8401843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      title: '10K Steps Daily',
      participants: 2145,
      difficulty: 'Intermediate',
      duration: 'Ongoing',
      image: 'https://images.pexels.com/photos/4753987/pexels-photo-4753987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      title: 'Summer Shred Challenge',
      participants: 876,
      difficulty: 'Advanced',
      duration: '8 weeks',
      image: 'https://images.pexels.com/photos/8436566/pexels-photo-8436566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];
  
  const [postsData, setPostsData] = useState(posts);
  
  // --- New state for post composer ---
  const [postContent, setPostContent] = useState("");
  const [postMedia, setPostMedia] = useState(null);
  const [postMediaPreview, setPostMediaPreview] = useState(null);
  const fileInputRef = useRef();
  
  const toggleLike = (postId) => {
    setPostsData(postsData.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };
  
  // --- Handle media selection ---
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setPostMedia(file);
    if (file) {
      setPostMediaPreview(URL.createObjectURL(file));
    } else {
      setPostMediaPreview(null);
    }
  };
  
  // --- Handle post submit ---
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postContent.trim() && !postMedia) return;
    const newPost = {
      id: Date.now(),
      user: {
        name: 'You',
        avatar: 'U',
        role: 'Member'
      },
      content: postContent,
      image: postMedia && postMedia.type.startsWith('image') ? postMediaPreview : undefined,
      video: postMedia && postMedia.type.startsWith('video') ? postMediaPreview : undefined,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      liked: false
    };
    setPostsData([newPost, ...postsData]);
    setPostContent("");
    setPostMedia(null);
    setPostMediaPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Community</h1>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        <button
          className={`pb-2 font-medium ${
            activeTab === 'feed'
              ? 'text-emerald-600 border-b-2 border-emerald-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('feed')}
        >
          Community Feed
        </button>
        <button
          className={`pb-2 font-medium ${
            activeTab === 'challenges'
              ? 'text-emerald-600 border-b-2 border-emerald-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('challenges')}
        >
          Challenges
        </button>
        <button
          className={`pb-2 font-medium ${
            activeTab === 'leaderboard'
              ? 'text-emerald-600 border-b-2 border-emerald-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('leaderboard')}
        >
          Leaderboard
        </button>
      </div>
      
      {/* Feed */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {/* Post composer */}
          <div className="wf-card">
            <form onSubmit={handlePostSubmit}>
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-600 font-medium">U</span>
                  </div>
                </div>
                <div className="flex-1">
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Share your fitness journey..."
                    rows={3}
                    value={postContent}
                    onChange={e => setPostContent(e.target.value)}
                  ></textarea>
                  {/* Media preview */}
                  {postMediaPreview && (
                    <div className="mt-2">
                      {postMedia && postMedia.type.startsWith('image') ? (
                        <img src={postMediaPreview} alt="preview" className="max-h-40 rounded" />
                      ) : (
                        <video src={postMediaPreview} controls className="max-h-40 rounded" />
                      )}
                    </div>
                  )}
                  <div className="flex justify-between mt-3">
                    <div className="flex space-x-2">
                      <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleMediaChange}
                        />
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </label>
                    </div>
                    <button className="wf-button-primary" type="submit">Post</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          {/* Posts */}
          {postsData.map(post => (
            <div key={post.id} className="wf-card">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-600 font-medium">{post.user.avatar}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{post.user.name}</h3>
                      <p className="text-xs text-gray-500">{post.user.role}</p>
                    </div>
                    <span className="text-xs text-gray-500">{post.timestamp}</span>
                  </div>
                  
                  <p className="mt-2">{post.content}</p>
                  
                  {post.image && (
                    <div className="mt-3 rounded-md overflow-hidden">
                      <img 
                        src={post.image} 
                        alt="Post" 
                        className="w-full h-64 object-cover" 
                      />
                    </div>
                  )}
                  
                  {post.video && (
                    <div className="mt-3 rounded-md overflow-hidden">
                      <video
                        src={post.video}
                        controls
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <div className="flex space-x-4">
                      <button 
                        className={`flex items-center space-x-1 ${post.liked ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => toggleLike(post.id)}
                      >
                        <Heart className="h-5 w-5" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                        <MessageCircle className="h-5 w-5" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                        <Share2 className="h-5 w-5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Challenges */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map(challenge => (
              <div key={challenge.id} className="wf-card overflow-hidden group">
                <div className="relative h-48">
                  <img 
                    src={challenge.image} 
                    alt={challenge.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-bold text-lg">{challenge.title}</h3>
                      <div className="flex items-center text-xs mt-1">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{challenge.participants.toLocaleString()} participants</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{challenge.difficulty}</span>
                    </div>
                    <div className="text-sm text-gray-500">{challenge.duration}</div>
                  </div>
                  
                  <button className="w-full wf-button-primary mt-2">Join Challenge</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <button className="wf-button-secondary">View All Challenges</button>
          </div>
        </div>
      )}
      
      {/* Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="wf-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Top Performers This Month</h2>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <span className="text-sm font-medium">Performance Leaderboard</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="wf-table">
              <thead className="bg-gray-50">
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Workouts</th>
                  <th>Calories Burned</th>
                  <th>Total Time</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-yellow-50">
                  <td className="font-bold">1</td>
                  <td className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-medium">JD</span>
                    </div>
                    <span>John Doe</span>
                  </td>
                  <td>28</td>
                  <td>12,450</td>
                  <td>32h 15m</td>
                  <td className="font-bold">1,245</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="font-bold">2</td>
                  <td className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-medium">AB</span>
                    </div>
                    <span>Alice Brown</span>
                  </td>
                  <td>25</td>
                  <td>11,280</td>
                  <td>29h 45m</td>
                  <td className="font-bold">1,128</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="font-bold">3</td>
                  <td className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-medium">RJ</span>
                    </div>
                    <span>Robert Johnson</span>
                  </td>
                  <td>22</td>
                  <td>10,850</td>
                  <td>27h 20m</td>
                  <td className="font-bold">1,085</td>
                </tr>
                <tr>
                  <td className="font-bold">4</td>
                  <td className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-medium">MS</span>
                    </div>
                    <span>Maria Smith</span>
                  </td>
                  <td>20</td>
                  <td>9,920</td>
                  <td>25h 10m</td>
                  <td className="font-bold">992</td>
                </tr>
                <tr>
                  <td className="font-bold">5</td>
                  <td className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-medium">FE</span>
                    </div>
                    <span className="font-medium">You</span>
                  </td>
                  <td>18</td>
                  <td>8,450</td>
                  <td>22h 30m</td>
                  <td className="font-bold">845</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;