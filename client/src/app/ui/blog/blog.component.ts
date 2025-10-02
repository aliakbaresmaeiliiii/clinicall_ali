import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss',
    standalone: false
})
export class BlogComponent implements OnInit {
  isLoading: boolean = true;
  selectedPost: any = null;
  
  posts = [
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
    },
    {
      id: 4,
      title: 'Exercise and Cardiovascular Health',
      body: 'Understanding the vital connection between physical activity and heart health for a longer, healthier life.',
      fullContent: `
        <h2>Exercise: Your Heart\'s Best Friend</h2>
        <p>Regular physical activity is one of the most effective ways to maintain cardiovascular health and prevent heart disease. Understanding how exercise benefits your heart can motivate you to stay active.</p>
        
        <h3>Types of Beneficial Exercise</h3>
        <p>A combination of aerobic exercise, strength training, and flexibility work provides comprehensive benefits for heart health. Aim for at least 150 minutes of moderate-intensity exercise per week.</p>
        
        <h3>Heart-Healthy Workout Tips</h3>
        <p>Start slowly and gradually increase intensity. Listen to your body and consult with healthcare professionals before beginning any new exercise program, especially if you have existing health conditions.</p>
      `,
      category: 'CARDIOLOGY',
      author: 'Dr. Sarah Johnson',
      published_date: 'January 20, 2025',
      img: '../../../assets/images/ui/blog/blog.jpg',
      readTime: '3 min read'
    },
    {
      id: 5,
      title: 'Sleep Quality and Overall Wellness',
      body: 'Exploring the critical role of quality sleep in physical and mental health maintenance.',
      fullContent: `
        <h2>The Foundation of Health: Quality Sleep</h2>
        <p>Sleep is not a luxury but a biological necessity that affects every aspect of our health. Understanding sleep hygiene can transform your overall well-being.</p>
        
        <h3>Creating a Sleep-Conducive Environment</h3>
        <p>Optimize your bedroom for quality sleep by maintaining a cool temperature, reducing noise and light pollution, and investing in a comfortable mattress and pillows.</p>
        
        <h3>Establishing Healthy Sleep Routines</h3>
        <p>Consistent sleep and wake times, even on weekends, help regulate your body\'s internal clock. Develop a relaxing pre-sleep routine to signal your body that it\'s time to wind down.</p>
      `,
      category: 'WELLNESS',
      author: 'Dr. Michael Chen',
      published_date: 'January 18, 2025',
      img: '../../../assets/images/ui/blog/blog.jpg',
      readTime: '4 min read'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  readMore(post: any) {
    this.router.navigate(['/blog', post.id]);
  }

  backToBlog() {
    this.selectedPost = null;
  }

  navigateToBlog() {
    this.router.navigate(['/blog']);
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
}
