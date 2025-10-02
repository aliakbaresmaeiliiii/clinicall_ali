import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
  standalone: false
})
export class BlogDetailComponent implements OnInit {
  blogPost: any = null;
  isLoading: boolean = true;

  blogPosts = [
    {
      id: 1,
      title: 'Understanding Modern Healthcare Trends',
      body: 'Explore the latest advancements in medical technology and how they are transforming patient care and treatment outcomes.',
      fullContent: `
        <h2>The Evolution of Healthcare Technology</h2>
        <p>In recent years, healthcare has undergone a remarkable transformation driven by technological innovation. From telemedicine to AI-powered diagnostics, the landscape of medical care is evolving at an unprecedented pace.</p>
        
        <h3>Telemedicine Revolution</h3>
        <p>Virtual consultations have become the new normal, allowing patients to access quality healthcare from the comfort of their homes. This approach not only improves accessibility but also reduces waiting times and healthcare costs.</p>
        
        <h3>AI in Medical Diagnostics</h3>
        <p>Artificial intelligence is revolutionizing how we diagnose and treat diseases. Machine learning algorithms can now analyze medical images with accuracy comparable to human experts, enabling earlier detection of conditions like cancer and cardiovascular diseases.</p>
        
        <h3>Wearable Health Technology</h3>
        <p>Smartwatches and fitness trackers are no longer just for counting steps. Modern wearables can monitor heart rate variability, blood oxygen levels, and even detect irregular heart rhythms, providing valuable data for preventive healthcare.</p>
        
        <h2>The Future of Healthcare</h2>
        <p>As technology continues to advance, we can expect even more personalized and efficient healthcare solutions. The integration of genomics, personalized medicine, and digital health platforms will create a healthcare system that is more proactive than reactive.</p>
      `,
      category: 'HEALTHCARE',
      author: 'Dr. Aliakbar Esmaeili',
      published_date: 'February 1, 2025',
      img: '../../../assets/images/ui/blog/blog.jpg',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Mental Wellness in the Digital Age',
      body: 'Learn about effective strategies for maintaining mental health while navigating the challenges of modern technology and social media.',
      fullContent: `
        <h2>Navigating Mental Health in a Connected World</h2>
        <p>While technology has brought numerous benefits to our lives, it has also introduced new challenges for mental wellness. The constant connectivity and information overload can take a toll on our psychological well-being.</p>
        
        <h3>Digital Detox Strategies</h3>
        <p>Regular breaks from digital devices are essential for mental health. Consider implementing "tech-free" hours during your day, especially before bedtime, to improve sleep quality and reduce anxiety.</p>
        
        <h3>Mindful Social Media Use</h3>
        <p>Social media can be both a source of connection and stress. Practice mindful scrolling by setting time limits, curating your feed to include positive content, and taking regular breaks from comparison-driven platforms.</p>
        
        <h3>Building Digital Resilience</h3>
        <p>Develop healthy coping mechanisms for dealing with online stress. This includes practicing digital boundaries, learning to recognize and avoid toxic online environments, and seeking professional help when needed.</p>
        
        <h2>Practical Tips for Digital Wellness</h2>
        <ul>
          <li>Set clear boundaries for work and personal time</li>
          <li>Practice regular digital detox periods</li>
          <li>Engage in offline hobbies and activities</li>
          <li>Seek professional support when feeling overwhelmed</li>
        </ul>
      `,
      category: 'PSYCHOLOGY',
      author: 'Dr. Hamid Reza',
      published_date: 'January 28, 2025',
      img: '../../../assets/images/ui/blog/blog.jpg',
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'Nutrition and Preventive Medicine',
      body: 'Discover how proper nutrition and lifestyle choices can prevent chronic diseases and promote long-term health and wellness.',
      fullContent: `
        <h2>The Power of Preventive Nutrition</h2>
        <p>Nutrition plays a crucial role in preventing chronic diseases and promoting overall health. By making informed dietary choices, we can significantly reduce the risk of conditions like diabetes, heart disease, and certain cancers.</p>
        
        <h3>Key Nutritional Principles</h3>
        <p>A balanced diet rich in fruits, vegetables, whole grains, and lean proteins provides the essential nutrients our bodies need to function optimally. Focus on variety and moderation rather than strict elimination diets.</p>
        
        <h3>Superfoods for Health</h3>
        <p>Incorporate nutrient-dense foods like berries, leafy greens, nuts, and fatty fish into your diet. These foods are packed with antioxidants, vitamins, and minerals that support immune function and reduce inflammation.</p>
        
        <h3>Hydration and Health</h3>
        <p>Proper hydration is fundamental to good health. Water supports digestion, nutrient absorption, and detoxification processes. Aim for 8-10 glasses of water daily, adjusting based on activity level and climate.</p>
        
        <h2>Building Healthy Eating Habits</h2>
        <ul>
          <li>Eat a rainbow of fruits and vegetables daily</li>
          <li>Choose whole grains over refined carbohydrates</li>
          <li>Include healthy fats from sources like avocados and olive oil</li>
          <li>Limit processed foods and added sugars</li>
          <li>Practice mindful eating and portion control</li>
        </ul>
        
        <h3>Long-term Benefits</h3>
        <p>Consistent healthy eating habits can lead to improved energy levels, better weight management, reduced disease risk, and enhanced overall quality of life. Remember, small, sustainable changes often yield the best long-term results.</p>
      `,
      category: 'NUTRITION',
      author: 'Dr. Elahe Esmaeili',
      published_date: 'January 25, 2025',
      img: '../../../assets/images/ui/blog/blog.jpg',
      readTime: '6 min read'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      this.loadBlogPost(postId);
    });
  }

  loadBlogPost(postId: string | null) {
    this.isLoading = true;
    
    setTimeout(() => {
      if (postId) {
        const post = this.blogPosts.find(p => p.id === parseInt(postId));
        if (post) {
          this.blogPost = post;
        } else {
          this.router.navigate(['/blog']);
        }
      } else {
        this.router.navigate(['/blog']);
      }
      this.isLoading = false;
    }, 500);
  }

  getCategoryColor(category: string): string {
    const colors: {[key: string]: string} = {
      'HEALTHCARE': '#667eea',
      'PSYCHOLOGY': '#764ba2',
      'NUTRITION': '#f093fb',
      'CARDIOLOGY': '#4facfe',
      'WELLNESS': '#43e97b'
    };
    return colors[category] || '#667eea';
  }

  getAuthorInitials(author: string): string {
    return author
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  navigateToBlog() {
    this.router.navigate(['/blog']);
  }
}
