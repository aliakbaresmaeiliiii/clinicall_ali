import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding keywords...');

  // Medical and healthcare related keywords with synonyms
  const keywordData = [
    {
      term: 'dentist',
      synonyms: JSON.stringify(['dentistry', 'dental', 'tooth', 'teeth', 'oral'])
    },
    {
      term: 'doctor',
      synonyms: JSON.stringify(['physician', 'medic', 'practitioner', 'clinician'])
    },
    {
      term: 'clinic',
      synonyms: JSON.stringify(['medical center', 'health center', 'hospital', 'practice'])
    },
    {
      term: 'specialty',
      synonyms: JSON.stringify(['specialization', 'field', 'area', 'discipline'])
    },
    {
      term: 'heart',
      synonyms: JSON.stringify(['cardiac', 'cardiovascular', 'chest'])
    },
    {
      term: 'skin',
      synonyms: JSON.stringify(['dermatology', 'dermatological', 'epidermis'])
    },
    {
      term: 'eye',
      synonyms: JSON.stringify(['ophthalmology', 'ocular', 'vision'])
    },
    {
      term: 'bone',
      synonyms: JSON.stringify(['orthopedic', 'skeletal', 'orthopaedic'])
    },
    {
      term: 'child',
      synonyms: JSON.stringify(['pediatric', 'pediatrics', 'kids', 'children'])
    },
    {
      term: 'woman',
      synonyms: JSON.stringify(['gynecology', 'obstetrics', 'female', 'women'])
    },
    {
      term: 'brain',
      synonyms: JSON.stringify(['neurology', 'neurological', 'neural'])
    },
    {
      term: 'cancer',
      synonyms: JSON.stringify(['oncology', 'tumor', 'malignancy'])
    },
    {
      term: 'kidney',
      synonyms: JSON.stringify(['nephrology', 'renal'])
    },
    {
      term: 'lung',
      synonyms: JSON.stringify(['pulmonology', 'respiratory', 'breathing'])
    },
    {
      term: 'stomach',
      synonyms: JSON.stringify(['gastroenterology', 'digestive', 'gut'])
    },
    {
      term: 'mental',
      synonyms: JSON.stringify(['psychiatry', 'psychological', 'psychology'])
    },
    {
      term: 'allergy',
      synonyms: JSON.stringify(['immunology', 'hypersensitivity', 'reaction'])
    },
    {
      term: 'pain',
      synonyms: JSON.stringify(['ache', 'discomfort', 'soreness'])
    },
    {
      term: 'fever',
      synonyms: JSON.stringify(['temperature', 'pyrexia'])
    },
    {
      term: 'infection',
      synonyms: JSON.stringify(['bacterial', 'viral', 'disease'])
    }
  ];

  for (const keyword of keywordData) {
    await prisma.keyword.upsert({
      where: { term: keyword.term },
      update: keyword,
      create: keyword
    });
  }

  console.log('Keywords seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
