import React, { ReactNode } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from "@nextui-org/react";


interface ConfirmModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    title: string;
    message: string;
    onSubmit: () => Promise<void>;
    submitMessage?: ReactNode;
    isSubmitted: boolean;

}

function ConfirmModal({ isOpen, onOpen, onOpenChange, title, message,onSubmit,submitMessage,isSubmitted}: ConfirmModalProps) {


    return (
        <div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                            <ModalBody>
                                <p>
                                    {message}
                                </p>
                                <p>
                                    {submitMessage}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button isDisabled={isSubmitted} color="primary" onPress={onSubmit}>
                                    Aceptar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}

export default ConfirmModal
