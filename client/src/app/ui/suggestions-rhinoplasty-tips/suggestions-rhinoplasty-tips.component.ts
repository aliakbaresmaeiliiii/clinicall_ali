import { Component } from '@angular/core';

@Component({
  selector: 'app-suggestions-rhinoplasty-tips',
  standalone: false,
  templateUrl: './suggestions-rhinoplasty-tips.component.html',
  styleUrl: './suggestions-rhinoplasty-tips.component.scss',
})
export class SuggestionsRhinoplastyTipsComponent {
  ophthalmologyTips = [
    {
      title: 'Femto-SMILE',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/1.jpg',
      centerName: 'Visionary Eye Center',
      address: '123 Jalan Tun Razak, Kuala Lumpur, Malaysia',
      userReviews: [
        'Exceptional service and modern facilities!',
        'I had an amazing experience with their advanced treatments.',
      ],
      starRating: 4.9,
      price: 2500,
      tip: 'A minimally invasive laser eye surgery for vision correction.',
    },
    {
      title: 'Cataract Surgery',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/2.jpg',
      centerName: 'Bright Eyes Clinic',
      address: '456 Jalan Gasing, Petaling Jaya, Malaysia',
      userReviews: [
        'The cataract surgery was smooth and painless.',
        'Highly professional staff and a caring environment.',
      ],
      starRating: 4.8,
      price: 3000,
      tip: 'Safe and effective removal of cataracts for clearer vision.',
    },
    {
      title: 'LASIK',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      centerName: 'Perfect Vision Center',
      address: '789 Jalan Sultan Ismail, Kuala Lumpur, Malaysia',
      userReviews: [
        'My vision is perfect now thanks to their LASIK procedure.',
        'State-of-the-art technology and great post-care service.',
      ],
      starRating: 4.9,
      price: 2000,
      tip: 'Quick and effective laser eye surgery to correct refractive errors.',
    },
    {
      title: 'Glaucoma Treatment',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/4.jpg',
      centerName: 'Eye Wellness Clinic',
      address: '21 Jalan Meru, Klang, Malaysia',
      userReviews: [
        'They helped manage my glaucoma with care and expertise.',
        'Highly recommend for anyone with eye pressure issues.',
      ],
      starRating: 4.7,
      price: 1500,
      tip: 'Comprehensive care for managing intraocular pressure effectively.',
    },
    {
      title: 'Retinal Surgery',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/5.jpg',
      centerName: 'Advanced Retina Center',
      address: '33 Jalan Tebrau, Johor Bahru, Malaysia',
      userReviews: [
        'Their expertise in retinal care is unmatched.',
        'I felt confident throughout my treatment process.',
      ],
      starRating: 4.8,
      price: 4000,
      tip: 'Specialized surgery for retinal detachment and other retinal issues.',
    },
    {
      title: 'Dry Eye Treatment',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/6.jpg',
      centerName: 'Comfort Vision Clinic',
      address: '55 Jalan Air Itam, George Town, Malaysia',
      userReviews: [
        'Their treatment relieved my dry eye symptoms significantly.',
        'The clinic is very clean, and the staff is super friendly.',
      ],
      starRating: 4.6,
      price: 1200,
      tip: 'Effective solutions for chronic dry eye problems.',
    },
    {
      title: 'Corneal Transplant',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/7.jpg',
      centerName: 'Cornea Care Center',
      address: '14 Jalan Lintas, Kota Kinabalu, Malaysia',
      userReviews: [
        'Professional and compassionate care for my transplant.',
        'I now have clear vision thanks to their expertise.',
      ],
      starRating: 4.9,
      price: 5000,
      tip: 'Restores vision by replacing damaged corneal tissue.',
    },
    {
      title: 'Pediatric Ophthalmology',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/8.jpg',
      centerName: 'Little Eyes Clinic',
      address: '28 Jalan Wong Ah Fook, Johor Bahru, Malaysia',
      userReviews: [
        'Great care for children’s eye problems.',
        'They made my child feel comfortable during the treatment.',
      ],
      starRating: 4.8,
      price: 1800,
      tip: 'Expert eye care services for children and adolescents.',
    },
    {
      title: 'Orthokeratology',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/9.jpg',
      centerName: 'Vision Shapers Center',
      address: '40 Jalan Ampang, Kuala Lumpur, Malaysia',
      userReviews: [
        'Their night lenses have improved my eyesight.',
        'A unique approach to managing myopia progression.',
      ],
      starRating: 4.7,
      price: 2500,
      tip: 'Non-surgical vision correction using customized contact lenses.',
    },
    {
      title: 'Eye Screening',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/10.jpg',
      centerName: 'Complete Vision Care',
      address: '90 Jalan Ipoh, Kuala Lumpur, Malaysia',
      userReviews: [
        'Comprehensive screening and detailed explanations.',
        'The staff was very thorough and professional.',
      ],
      starRating: 4.8,
      price: 100,
      tip: 'Routine eye examinations to detect and prevent vision problems.',
    },
    {
      title: 'Contact Lens Fitting',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/11.jpg',
      centerName: 'Lens Experts Clinic',
      address: '22 Jalan Melaka, Melaka City, Malaysia',
      userReviews: [
        'Perfectly fitted contact lenses for my needs.',
        'The staff were patient and helpful in selecting lenses.',
      ],
      starRating: 4.8,
      price: 300,
      tip: 'Personalized contact lens fitting for optimal comfort and vision.',
    },
    {
      title: 'Diabetic Retinopathy Treatment',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/12.jpg',
      centerName: 'Vision Plus Diabetes Care',
      address: '10 Jalan Tun Fuad, Sabah, Malaysia',
      userReviews: [
        'Excellent care for diabetic eye conditions.',
        'The doctor explained everything clearly.',
      ],
      starRating: 4.7,
      price: 3500,
      tip: 'Specialized treatment for diabetes-related eye problems.',
    },
    {
      title: 'Eyelid Surgery',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/13.jpg',
      centerName: 'Eye Beauty Center',
      address: '80 Jalan Alor, Kuala Lumpur, Malaysia',
      userReviews: [
        'My eyelids feel and look amazing after the surgery.',
        'Great results and caring doctors.',
      ],
      starRating: 4.9,
      price: 2000,
      tip: 'Cosmetic and functional surgeries for eyelids.',
    },
    {
      title: 'Strabismus Surgery',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/14.jpg',
      centerName: 'Aligned Vision Clinic',
      address: '15 Jalan Bukit Bintang, Kuala Lumpur, Malaysia',
      userReviews: [
        'My child’s strabismus is completely corrected.',
        'Thankful for their professional approach.',
      ],
      starRating: 4.8,
      price: 2500,
      tip: 'Surgery to correct eye misalignment for improved vision.',
    },
    {
      title: 'Macular Degeneration Treatment',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/15.jpg',
      centerName: 'Retina Vision Center',
      address: '60 Jalan Penang, George Town, Malaysia',
      userReviews: [
        'Top-notch care for my macular degeneration.',
        'Highly skilled doctors and great results.',
      ],
      starRating: 4.8,
      price: 5000,
      tip: 'Advanced treatments to slow vision loss due to macular degeneration.',
    },
    {
      title: 'Eye Trauma Surgery',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/16.jpg',
      centerName: 'Emergency Eye Center',
      address: '30 Jalan Raja Laut, Kuala Lumpur, Malaysia',
      userReviews: [
        'Saved my eye after a severe injury.',
        'Quick and expert response to my emergency.',
      ],
      starRating: 4.9,
      price: 4500,
      tip: 'Urgent care and surgery for traumatic eye injuries.',
    },
    {
      title: 'Eye Prosthetics',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/17.jpg',
      centerName: 'Vision Aesthetics Center',
      address: '77 Jalan Imbi, Kuala Lumpur, Malaysia',
      userReviews: [
        'My prosthetic eye looks completely natural.',
        'Wonderful service and attention to detail.',
      ],
      starRating: 4.9,
      price: 3500,
      tip: 'Custom prosthetic eyes for improved aesthetics and confidence.',
    },
    {
      title: 'Optical Coherence Tomography (OCT)',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/18.jpg',
      centerName: 'Tech-Eye Diagnostics',
      address: '42 Jalan Ampang, Kuala Lumpur, Malaysia',
      userReviews: [
        'Detailed imaging helped diagnose my eye issue accurately.',
        'Quick and precise service.',
      ],
      starRating: 4.8,
      price: 1500,
      tip: 'Advanced imaging for diagnosing eye conditions.',
    },
    {
      title: 'Vision Therapy',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/19.jpg',
      centerName: 'Eye Strength Center',
      address: '90 Jalan Ipoh, Kuala Lumpur, Malaysia',
      userReviews: [
        'My vision has improved drastically after therapy sessions.',
        'Friendly and experienced therapists.',
      ],
      starRating: 4.7,
      price: 800,
      tip: 'Customized therapy to strengthen and improve visual skills.',
    },
    {
      title: 'Eye Tumor Surgery',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/20.jpg',
      centerName: 'Vision Oncology Center',
      address: '50 Jalan Raja Chulan, Kuala Lumpur, Malaysia',
      userReviews: [
        'My tumor was removed successfully with great care.',
        'The team is extremely skilled and compassionate.',
      ],
      starRating: 4.9,
      price: 7000,
      tip: 'Specialized care for eye tumors with precision surgery.',
    },
  ];

}
