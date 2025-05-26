
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image, MessageSquare, Camera, Link2, ExternalLink, HelpCircle, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HowToPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '0550a311-49ef-429f-abd4-bc476ebee7a5',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'New Contact Form Submission from DQUOTE'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Message Sent",
          description: "We've received your message and will respond soon!"
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to send message',
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  
  const faqs = [
    {
      question: "How do I get verified on DQUOTE?",
      answer: "Verification is available for public figures, celebrities, and notable brands. Go to Settings > Verification Request and fill out the application form with your details and proof of identity."
    },
    {
      question: "Can I edit or delete my posts?",
      answer: "Yes, you can edit or delete your posts at any time. Simply click the three dots menu on your post and select 'Delete Post'. Note that once deleted, posts cannot be recovered."
    },
    {
      question: "How do I change my username?",
      answer: "You can change your username in Settings > Edit Profile. Note that you can only change your username once every 14 days."
    },
    {
      question: "Why can't I see someone's posts?",
      answer: "If you can't see someone's posts, they may have a private account and you need to follow them first, or they may have blocked you."
    },
    {
      question: "How do I report inappropriate content?",
      answer: "To report a post, click the three dots menu on the post and select 'Report'. For reporting users, go to their profile, click the shield icon, and follow the instructions."
    },
    {
      question: "What image formats are supported?",
      answer: "DQUOTE supports JPG, PNG, GIF, and WebP image formats. Make sure your image URL ends with one of these extensions."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-black border-b dark:border-[#2563ea]">
        <div className="flex items-center p-4">
          <button onClick={() => navigate(-1)} className="text-gray-600 dark:text-white mr-4">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Help & FAQs</h1>
        </div>
      </div>
      
      <Tabs defaultValue="howto" className="w-full">
        <div className="px-4 pt-4">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="howto">How To</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="howto" className="p-0 m-0">

      <div className="p-4 space-y-6">
        {/* Create Post */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>How to Create a Post</span>
            </CardTitle>
            <CardDescription>Learn how to share your thoughts with the community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="font-medium">1. Navigate to Create Page</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tap the "+" icon in the bottom navigation bar</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">2. Write Your Content</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Type your message in the text area. You can write up to 2000 characters.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">3. Add Image (Optional)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Paste a direct image URL to include a photo with your post</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">4. Share Your Post</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tap the "Share" button to publish your post</p>
            </div>
          </CardContent>
        </Card>

        {/* Create Story */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5" />
              <span>How to Create a Story</span>
            </CardTitle>
            <CardDescription>Share temporary content that disappears after 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="font-medium">1. Access Story Creation</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tap "Add story" in the stories section on your home page</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">2. Write Your Story</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Add text content (up to 500 characters)</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">3. Add Image (Optional)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Include an image URL to make your story more engaging</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">4. Share Your Story</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your story will be visible for 24 hours to your followers</p>
            </div>
          </CardContent>
        </Card>

        {/* Image Hosting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Image className="w-5 h-5" />
              <span>How to Add Images</span>
            </CardTitle>
            <CardDescription>Learn how to host and add images to your posts and stories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium">Recommended Image Hosting Services:</p>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">ImgBB</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Free image hosting with direct links</p>
                    </div>
                    <a 
                      href="https://imgbb.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Imgur</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Popular image hosting platform</p>
                    </div>
                    <a 
                      href="https://imgur.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Steps to Add Images:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>Upload your image to one of the hosting services above</li>
                <li>Copy the direct image URL (must end with .jpg, .png, .gif, etc.)</li>
                <li>Paste the URL in the image field when creating posts or stories</li>
                <li>The image will appear in your post/story automatically</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Profile Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Link2 className="w-5 h-5" />
              <span>Profile & Social Links</span>
            </CardTitle>
            <CardDescription>Customize your profile and add social media links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="font-medium">Adding Social Links:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>Go to Settings → Edit Profile</li>
                <li>Scroll to the Social Links section</li>
                <li>Add your social media URLs (Instagram, Twitter, YouTube, etc.)</li>
                <li>Save your profile</li>
                <li>Icons will appear on your profile below your bio</li>
              </ol>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Profile Tips:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>Use a clear profile picture</li>
                <li>Write an engaging bio</li>
                <li>Add your social links to gain more followers</li>
                <li>Apply for verification if you're a public figure</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
        </TabsContent>
        
        <TabsContent value="faqs" className="p-0 m-0">
          <div className="p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
                <CardDescription>Find answers to common questions about DQUOTE</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <button
                      className="w-full p-4 text-left flex justify-between items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="font-medium">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="p-4 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="contact" className="p-0 m-0">
          <div className="p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="w-5 h-5" />
                  <span>Contact Us</span>
                </CardTitle>
                <CardDescription>Have a question or feedback? Reach out to our team</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Your message or question"
                      rows={5}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HowToPage;
