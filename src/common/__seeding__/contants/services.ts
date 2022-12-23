import { Service } from '../../../service/entities';

const services: Partial<Service>[] = [
  {
    name: 'Vaccination',
    description:
      'We’ll keep your pet safe from parvo, distemper, leptospirosis, rabies, corona, kennel cough and more — and send reminders when they’re due for a vaccine.',
  },
  {
    name: 'Deworming',
    description:
      'We offer deworming services for dogs and cats. This treatment involves administering medication to kill any worms or parasites',
  },
  {
    name: 'Check-up',
    description:
      'Our team of skilled veterinarians and support staff are dedicated to providing high-quality care for your furry friends. Our check-up service includes a thorough examination of your pet to assess their overall health and well-being.',
  },
  {
    name: 'Treatment',
    description:
      "We offer advanced radiology services for pets. Our state-of-the-art equipment allows us to take high-quality X-ray images of your pet's body, providing valuable information about their health and any potential medical conditions.",
  },
  {
    name: 'Rapid Test Kits',
    description:
      'Rapid test kits can save pet owners time and money by allowing them to quickly determine whether their pet is suffering from a particular condition.',
  },
  {
    name: 'Ultrasound',
    description:
      'Our pet clinic offers ultrasound services for your furry friends. Ultrasound is a non-invasive and painless imaging technique that uses sound waves to produce pictures of the inside of the body.',
  },
  {
    name: 'X-ray',
    description:
      'Our pet clinic offers x-ray services for your beloved pets. X-ray, or radiography, is a common imaging technique that uses ionizing radiation to produce images of the inside of the body.',
  },
  {
    name: 'Minor Surgery',
    description:
      'Our pet clinic offers minor surgical services for your furry companions. Our experienced veterinarians are skilled in performing various types of minor surgeries, such as spaying and neutering, tooth extractions, and tumor removals.',
  },
  {
    name: 'Pet Grooming',
    description:
      'Our pet clinic offers professional grooming services for your furry friends. Our experienced groomers provide a range of services, including bathing, brushing, trimming, and nail clipping.',
  },
  {
    name: 'Confinement',
    description:
      'Our pet clinic offers confinement services for your furry companions. If your pet needs to be kept in a controlled environment for medical or other reasons, our clinic provides a safe and comfortable space for them to stay.',
  },
];

export default services;
