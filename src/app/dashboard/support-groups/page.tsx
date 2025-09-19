import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

const supportGroups = [
  {
    id: 'sg1',
    title: 'Stress & Anxiety Support',
    description: 'A safe space to discuss coping mechanisms for stress and anxiety in a student environment.',
    placeholderId: 'support-group-stress',
  },
  {
    id: 'sg2',
    title: 'Exam Pressure Group',
    description: 'Connect with peers to share study strategies and manage the pressure of exams.',
    placeholderId: 'support-group-exams',
  },
  {
    id: 'sg3',
    title: 'Relationship Navigators',
    description: 'Discuss challenges and triumphs in personal and social relationships during college life.',
    placeholderId: 'support-group-relationships',
  },
  {
    id: 'sg4',
    title: 'Loneliness & Connection',
    description: 'A group for students feeling isolated, looking to build meaningful connections and community.',
    placeholderId: 'support-group-loneliness',
  },
];

export default function SupportGroupsPage() {
  const getImage = (placeholderId: string) => {
    return PlaceHolderImages.find(img => img.id === placeholderId);
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Peer Support Groups</h1>
        <p className="text-muted-foreground">
          Connect with others who understand. Join a moderated group to share and listen.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {supportGroups.map((group) => {
          const image = getImage(group.placeholderId);
          return (
            <Card key={group.id} className="flex flex-col overflow-hidden">
              <CardHeader className="p-0">
                {image && (
                   <div className="aspect-video relative">
                     <Image
                       src={image.imageUrl}
                       alt={group.title}
                       fill
                       className="object-cover"
                       data-ai-hint={image.imageHint}
                     />
                   </div>
                )}
                <div className="p-6 pb-0">
                    <CardTitle className="font-headline">{group.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6 pt-2">
                <CardDescription>{group.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href="#">
                    Join Group <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
