import QuizApp from '@/components/online-test/Quiz-app';
import React from 'react'

type PageProps = {
  params: {
    id: string;
  };
};


const page = ({ params }: PageProps)  => {
  return (
    <div className='pb-60 md:pb-0'>
        <QuizApp id={params.id}/>
    </div>
  )
}

export default page