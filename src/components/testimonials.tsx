import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import useIsMobile from "@/hooks/useIsMobile";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Pathum Perera",
    role: "Senior Software Engineer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    quote:
      "The architectural patterns here are excellent. It helped our team streamline our Spring Boot microservices significantly.",
  },
  {
    name: "Kasun Jayawardena",
    role: "Mobile App Developer",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    quote:
      "Building native Android experiences is much faster when the backend integration is this clean. Highly recommended for local startups.",
  },
  {
    name: "Dinuka Fernando",
    role: "Fullstack Developer",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    quote:
      "Integrating React with complex PostgreSQL schemas used to be a challenge, but this toolkit made the data mapping seamless.",
  },
  {
    name: "Sajith Wickramasinghe",
    role: "System Architect",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    quote:
      "I was looking for a robust way to manage inventory logic and user flows. This provided the exact structure needed for our enterprise app.",
  },
  {
    name: "Tharindu Silva",
    role: "Backend Lead",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    quote:
      "The focus on clean code and efficient DTO management is impressive. It aligns perfectly with industry best practices.",
  },
  {
    name: "Ishara Gunawardane",
    role: "Frontend Engineer",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote:
      "The UI components are beautifully designed and highly responsive. It makes building professional-grade dashboards a breeze.",
  },
  {
    name: "Nuwan Hettiarachchi",
    role: "SaaS Founder",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    quote:
      "We were able to launch our MVP in record time. The balance between flexibility and pre-built utility is exactly what we needed.",
  },
  {
    name: "Roshan Kumara",
    role: "Database Administrator",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    quote:
      "Managing complex relational data and real-time syncing became much simpler. A game-changer for modern web development.",
  },
  {
    name: "Kaveen Rathnayake",
    role: "Lead Engineer",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    quote:
      "A true gold mine for Sri Lankan developers working with modern stacks. The documentation is clear and very practical.",
  },
  {
    name: "Lahiru Madushanka",
    role: "Cloud Solutions Architect",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    quote:
      "Handling authentication and cloud deployments has never been this straightforward. It’s perfect for scalable applications.",
  },
  {
    name: "Chathura Rajapakse",
    role: "DevOps Engineer",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    quote:
      "The integration with Vercel and CI/CD pipelines is flawless. It saved us so much time on the infrastructure side.",
  },
  {
    name: "Mahela Senanayake",
    role: "Product Manager",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    quote:
      "We needed a solution that could handle finance and inventory tracking elegantly. This provided the perfect foundation for our core services.",
  },
];

const chunkArray = (
  array: Testimonial[],
  chunkSize: number,
): Testimonial[][] => {
  const result: Testimonial[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export default function WallOfLoveSection() {
  const isMobile = useIsMobile();
  const value = isMobile ? 2 : 3;

  const testimonialChunks = chunkArray(
    testimonials,
    Math.ceil(testimonials.length / value),
  );

  return (
    <section>
      <div className="py-16 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Loved by the Community</h2>
            <p className="mt-6">
              
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {testimonialChunks.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className="space-y-3">
                {chunk.map(({ name, role, quote, image }, index) => (
                  <Card key={index}>
                    <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                      <Avatar className="size-9">
                        <AvatarImage
                          alt={name}
                          src={image}
                          loading="lazy"
                          width="120"
                          height="120"
                        />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-medium">{name}</h3>

                        <span className="text-muted-foreground block text-sm tracking-wide">
                          {role}
                        </span>

                        <blockquote className="mt-3">
                          <p className="text-gray-700 dark:text-gray-300">
                            {quote}
                          </p>
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
