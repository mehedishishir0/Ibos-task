import QuizApp from '@/components/online-test/Quiz-app';
import React from 'react'

type PageProps = {
  params: {
    id: string;
  };
};


const page = ({ params }: PageProps)  => {
  return (
    <div>
        <QuizApp id={params.id}/>
    </div>
  )
}

export default page