'use client'

import { ScrollFadeIn } from "../ui/ScrollFadeIn"
import { StaggerChildren } from "../ui/StaggerChildren"

const members = [
    {
        name: 'Méschac Irung',
        role: 'Creator',
        avatar: 'https://avatars.githubusercontent.com/u/47919550?v=4',
    },
    {
        name: 'Théo Balick',
        role: 'Frontend Dev',
        avatar: 'https://avatars.githubusercontent.com/u/68236786?v=4',
    },
    {
        name: 'Glodie Lukose',
        role: 'Frontend Dev',
        avatar: 'https://avatars.githubusercontent.com/u/99137927?v=4',
    },
    {
        name: 'Bernard Ngandu',
        role: 'Backend Dev',
        avatar: 'https://avatars.githubusercontent.com/u/31113941?v=4',
    },
]

export function TeamSection() {
    return (
        <ScrollFadeIn>
        <section className="py-12 md:py-32">
            <div className="mx-auto max-w-3xl px-8 lg:px-0">
                <h2 className="mb-8 text-4xl font-bold md:mb-16 lg:text-5xl">Our team</h2>

                <div>
                    <h3 className="mb-6 text-lg font-medium">Leadership</h3>
                    <StaggerChildren staggerMs={80} className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4">
                        {members.map((member, index) => (
                            <div key={index}>
                                <div className="bg-background size-20 rounded-full border p-0.5 shadow shadow-sm">
                                    <img className="aspect-square rounded-full object-cover" src={member.avatar} alt={member.name} height="460" width="460" loading="lazy" />
                                </div>
                                <span className="mt-2 block text-sm">{member.name}</span>
                                <span className="text-text-tertiary block text-xs">{member.role}</span>
                            </div>
                        ))}
                    </StaggerChildren>
                </div>

                <div className="mt-6">
                    <h3 className="mb-6 text-lg font-medium">Engineering</h3>
                    <StaggerChildren staggerMs={80} className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4">
                        {members.map((member, index) => (
                            <div key={index}>
                                <div className="bg-background size-20 rounded-full border p-0.5 shadow shadow-sm">
                                    <img className="aspect-square rounded-full object-cover" src={member.avatar} alt={member.name} height="460" width="460" loading="lazy" />
                                </div>
                                <span className="mt-2 block text-sm">{member.name}</span>
                                <span className="text-text-tertiary block text-xs">{member.role}</span>
                            </div>
                        ))}
                    </StaggerChildren>
                </div>

                <div className="mt-6">
                    <h3 className="mb-6 text-lg font-medium">Marketing</h3>
                    <StaggerChildren staggerMs={80} className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4">
                        {members.map((member, index) => (
                            <div key={index}>
                                <div className="bg-background size-20 rounded-full border p-0.5 shadow shadow-sm">
                                    <img className="aspect-square rounded-full object-cover" src={member.avatar} alt={member.name} height="460" width="460" loading="lazy" />
                                </div>
                                <span className="mt-2 block text-sm">{member.name}</span>
                                <span className="text-text-tertiary block text-xs">{member.role}</span>
                            </div>
                        ))}
                    </StaggerChildren>
                </div>
            </div>
        </section>
        </ScrollFadeIn>
    )
}
