
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { Link } from 'react-router'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function FAQsSection() {
    const faqItems: FAQItem[] = [
    {
        id: 'item-1',
        icon: 'users',
        question: 'How do I find the right mentor for my skill level?',
        answer: 'SkillMentor uses an intelligent matching system that analyzes your current proficiency in Java, React, or Spring Boot and pairs you with mentors who have proven expertise in those specific stacks and industry experience.',
    },
    {
        id: 'item-2',
        icon: 'video',
        question: 'How do the mentorship sessions work?',
        answer: 'Sessions are conducted via integrated 1-on-1 video calls or through structured code review requests. You can book a slot that fits your schedule, and all resources shared during the session are saved to your dashboard.',
    },
    {
        id: 'item-3',
        icon: 'code',
        question: 'Can I get help with specific project bugs?',
        answer: 'Yes! SkillMentor is designed for practical learning. You can share your repository links (like GitHub) with your mentor for real-time troubleshooting, code refactoring advice, and system architecture reviews.',
    },
    {
        id: 'item-4',
        icon: 'credit-card',
        question: 'How do subscription payments work?',
        answer: 'We offer flexible monthly and annual plans. Payments are securely processed on the same day each billing cycle. You can upgrade, downgrade, or cancel your subscription at any time through your account settings.',
    },
    {
        id: 'item-5',
        icon: 'award',
        question: 'Will I receive a certificate after completing a roadmap?',
        answer: 'Absolutely. Once you complete a structured skill roadmap and your mentor validates your final project, you will receive a verified SkillMentor Certificate that you can share on LinkedIn or your professional portfolio.',
    },
];

    return (
        <section className="bg-muted dark:bg-background py-20">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground mt-4">
                                Can't find what you're looking for? Contact our{' '}
                                <Link
                                    to="#"
                                    className="text-primary font-medium hover:underline">
                                    customer support team
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon
                                                    name={item.icon}
                                                    className="m-auto size-4"
                                                />
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-base">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
