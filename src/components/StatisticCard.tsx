import { cn } from '@/lib/utils'
import { Card, CardContent } from './ui/card'

export default function StatisticCard({text, count,colour}:{text:string, count:number|string, colour?:string}) {
  return (
    <>
    <Card className={cn(
      'border-0 border-s-4', colour
    )} >
        <CardContent>
            <div>
                <p className='text-muted-foreground'>{text}</p>
                <p className='text-3xl font-bold'>{count}</p>
            </div>
        </CardContent>
    </Card>
    </>
  )
}
