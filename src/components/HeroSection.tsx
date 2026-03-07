import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'

export default function ContentSection() {
    return (
        <section className="pt-17 pb-10 md:pt-27 md:pb-16">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
                <div className="mx-auto max-w-xl space-y-10 text-center md:space-y-7">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl">Find your SkillMentor</h2>
                    <p>Empower your career with personalized mentorship for AWS Developer
Associate, Interview Prep, and more.</p>
                    <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="gap-1 pr-1.5">
                            <Link to="/dashboard">
                                <span>Get Started</span>
                                <ChevronRight className="size-2 ml-2" />
                            </Link>
                        </Button>
                </div>
                <img
                    className="rounded-(--radius) grayscale"
                    src="https://images.unsplash.com/photo-1530099486328-e021101a494a?q=80&w=2747&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="team image"
                    height=""
                    width=""
                    loading="lazy"
                />
            </div>
        </section>
    )
}
