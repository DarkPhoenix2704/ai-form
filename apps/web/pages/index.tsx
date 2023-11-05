import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@nextui-org/react';
import { MdOutlineEdit } from 'react-icons/md';
import { SlOptionsVertical } from 'react-icons/sl';
import { NextPageWithLayout } from './_app';
import { useForms, useMutateForm } from '@app/hooks';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const IndexPage: NextPageWithLayout = () => {
  const forms = useForms();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const createForm = useMutateForm();

  useEffect(() => {
    forms.refetch();
  }, [router]);

  return (
    <div className="flex flex-col px-16 py-16 w-full h-full">
      <div className="flex w-full gap-1">
        <Button color="primary" onClick={onOpen}>
          Create new Form
        </Button>
      </div>
      <div className="flex mt-2 gap-1 flex-col">
        {forms.data && forms.data.length === 0 && (
          <div className="flex flex-col h-[400px] items-center justify-center">
            <h1 className="text-2xl">No Forms Found</h1>
            <h2 className="text-lg">Create a new form to get started</h2>
          </div>
        )}
        {forms.data &&
          forms.data.length > 0 &&
          forms.data.map((form) => (
            <div
              className="flex border-1 p-2 cursor-pointer rounded-md w-full shadow-sm"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/edit/${form.id}`);
              }}
            >
              <div className="flex flex-grow flex-col gap-1">
                <h1>{form.title}</h1>
                <h4>{form.description}</h4>
              </div>
              <div className="flex items-center justify-center">
                <Popover placement="left">
                  <PopoverTrigger>
                    <SlOptionsVertical className="w-4 h-4 mr-2" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <h2 className="py-1 w-full flex cursor-pointer items-center gap-1 justify-left">
                      <MdOutlineEdit className="w-4 h-4" />
                      Edit
                    </h2>
                    <h2 className="py-1 justify-left w-full cursor-pointer flex hover:first-letter:bg-red-50 text-red-500 items-center gap-1 justify-center">
                      <MdOutlineEdit className="w-4 h-4" />
                      Delete
                    </h2>
                    <h2
                      className="py-1 flex justify-left cursor-pointer items-center gap-1 justify-center"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `http://localhost:3000/form/${form.id}`,
                        );
                      }}
                    >
                      <MdOutlineEdit className="w-4 h-4" />
                      Copy Link
                    </h2>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Form
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Form Title"
                  className="w-full"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  placeholder="Form Description"
                  className="w-full"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={async () => {
                    await createForm.mutateAsync({
                      title: title,
                      desc: description,
                    });
                    forms.refetch();

                    router.push(`/edit/${forms.data[0].id}`);

                    onClose();
                  }}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

IndexPage.requiresAuth = true;

export default IndexPage;
