import { Card, CardContent } from './ui/card'

export default function StatisticCard() {
  return (
    <>
    <Card className='border-0 border-s-4 border-amber-400'>
        <CardContent>
            <div>
                <p className='text-muted-foreground'>Total Students</p>
                <p className='text-3xl font-bold'>233</p>
            </div>
        </CardContent>
    </Card>
    </>
  )
}
